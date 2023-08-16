import { writable, get, derived } from 'svelte/store'
import { writableSyncLocalStorage } from './utils'
import { locale } from './locale'

type Translation = {
  [key: string]: string
}

type AllowTranslateState = 'default' | 'allow' | 'not-allow'

export const isTranslationFeatureOn = writable(false)
export const allowTranslate = writableSyncLocalStorage<AllowTranslateState>('imAllowTranslate', 'default')
export const defaultAllowTranslate = writable(false)
export const isTranslateOn = derived(
  [isTranslationFeatureOn, allowTranslate, defaultAllowTranslate],
  ([$isTranslationFeatureOn, $allowTranslate, $defaultAllowTranslate]) => {
    if (!$isTranslationFeatureOn) {
      return false
    }
    if ($allowTranslate === 'default') {
      return $defaultAllowTranslate
    } else {
      return $allowTranslate === 'allow'
    }
  }
)

interface ITranslationPayload {
  fromLang: string
  toLang: string
  message: string
}

interface ITranslatedResult {
  message: string
  translatedMessage: string
}


export const chatroomTranslation = writable<Translation>({})
const chatroomTranslationApi = writable<(data: ITranslationPayload[]) => Promise<ITranslatedResult[]>>(null)

// record usage of translation
// if a message is using translation, record it into the usage map
// if a message if unmount, remove it from the usage map
// if a message usage is zero, remove it from the translation map

type UsageMap = { [key: string]: number[] | null }

let chatViewId = 0
let deleteViewIdQueue = [];
let translationUsageMap: UsageMap = {}

export const generateChatViewId = () => {
  return chatViewId++
}

export const onDestoryChatView = (viewId: number) => {
  console.log('onDestoryChatView', viewId);
  deleteViewIdQueue.push(viewId)
}

function batchRemoveChatViewId() {
  if (deleteViewIdQueue.length > 10) {
    const chatroomTranslationMap = get(chatroomTranslation)
    const removeMsgList = [];
    for (const key in translationUsageMap) {
      const usageList = translationUsageMap[key]
      if (usageList) {
        const filteredList = usageList.filter(viewId => !deleteViewIdQueue.includes(viewId));
        if (filteredList.length === 0) {
          removeMsgList.push(key)
        }
      }
    }
    if (removeMsgList.length > 0) {
      removeMsgList.forEach(key => {
        translationUsageMap[key] = null
        chatroomTranslationMap[key] = null
        requestedMessageMap[key] = null
      })
      deleteViewIdQueue = [];
      chatroomTranslation.set(chatroomTranslationMap)
    }
  }
}

const removeTranslationInterval = 1000 * 5 * 60 // 5 minutes

setInterval(() => {
  batchRemoveChatViewId();
}, removeTranslationInterval);

function addChatViewId(viewId: number, fromLang: string, toLang: string, msg: string) {
  const key = getRequestKey({
    from: fromLang,
    to: toLang,
    message: msg
  })
  translationUsageMap[key] = translationUsageMap[key] || []
  if (!translationUsageMap[key].includes(viewId)) {
    translationUsageMap[key].push(viewId)
  }
}

export function initChatroomTranslationApi(fn) {
  chatroomTranslationApi.set(fn);
}

interface ITranslationPayload {
  fromLang: string
  toLang: string
  message: string
}

interface ITranslationResponseData {
  message: string,
  translatedMessage: string
}

const requestedMessageMap: { [key: string]: boolean } = {}

function getRequestKey({
  from,
  to,
  message
}: {
  from: string
  to: string
  message: string
}) {
  return `${from}|${to}|${message}`
}

function localeNormalize(langCode: string) {
  if (langCode === 'zh') {
    return 'zh-cn'
  }
  return langCode.toLowerCase().replace('_', '-')
}

async function batchTranslateMessage(messageList: ITranslationPayload[]) {
  const notRequestedMessageList = messageList.filter(item => !requestedMessageMap[getRequestKey({
    from: item.fromLang,
    to: item.toLang,
    message: item.message
  })])
  if (notRequestedMessageList.length > 0) {
    notRequestedMessageList.forEach(item => {
      requestedMessageMap[getRequestKey({
        from: item.fromLang,
        to: item.toLang,
        message: item.message
      })] = true
    })
    const data = await get(chatroomTranslationApi)(notRequestedMessageList)
    if (data?.length > 0) {
      // batch translation must be in the same language
      const lang = notRequestedMessageList[0].toLang
      const translation: Translation = get(chatroomTranslation)
      // TODO: too many translation may use too many memory, we may need to clear up the old translation
      data.forEach((item: ITranslationResponseData, i) => {
        const key = getRequestKey({
          from: notRequestedMessageList[i].fromLang,
          to: notRequestedMessageList[i].toLang,
          message: item.message
        })
        translation[key] = item.translatedMessage
      })
      chatroomTranslation.set(translation)
    }
  }
}

let batchTranslateTimer: NodeJS.Timeout | null = null
let batchQueue: ITranslationPayload[] = []
const throttleBatchTime = 100

function translateMessage(msg: string, fromLang: string, toLang: string) {
  // if target language has been changed, we need to clear the batch queue
  if (batchQueue.length > 0 && batchQueue[0].toLang !== toLang) {
    batchQueue = []
  }
  // due to chatroom has many messages, we need to batch translate
  // we apply a throttle to avoid too many requests
  batchQueue.push({
    fromLang: fromLang,
    toLang: toLang,
    message: msg
  })
  if (!batchTranslateTimer) {
    batchTranslateTimer = setTimeout(() => {
      batchTranslateMessage(batchQueue)
      batchQueue = []
      batchTranslateTimer = null
    }, throttleBatchTime)
  }
}

const allowTranslateLanguage = [
  'zh-cn',
  'vi-vn'
]

export const chatT = derived(
  [chatroomTranslation, locale, isTranslateOn, chatroomTranslationApi],
  ([$chatroomTranslation, $locale, $isTranslateOn, $chatroomTranslationApi]) => (msg: string, msgLang: string, viewId: number) => {
    // msgLang and userLang may be using '_', while translation api is using '-', may need to transform it
    const normalizedUserLang = localeNormalize($locale);
    const normalizedMsgLang = localeNormalize(msgLang);
    if ($chatroomTranslationApi && allowTranslateLanguage.includes(normalizedUserLang) && (!$isTranslateOn || normalizedUserLang === normalizedMsgLang)) {
      return msg
    }
    const key = getRequestKey({
      from: normalizedMsgLang,
      to: normalizedUserLang,
      message: msg
    });
    const translatedMsg = $chatroomTranslation[key]
    if (translatedMsg) {
      addChatViewId(viewId, normalizedMsgLang, normalizedUserLang, msg)
      return translatedMsg
    } else {
      translateMessage(
        msg,
        normalizedMsgLang, // from
        normalizedUserLang // to
      )
    }
    return msg
  }
)