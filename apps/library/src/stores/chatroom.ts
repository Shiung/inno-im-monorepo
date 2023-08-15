import { writable, get, derived } from 'svelte/store'
import { writableSyncLocalStorage } from './utils'
import { locale } from './locale'

type Translation = {
  [key: string]: string
}

type TranslationMap = {
  [langCode: string]: Translation
}

type AllowTranslateState = 'default' | 'allow' | 'not-allow'

export const allowTranslate = writableSyncLocalStorage<AllowTranslateState>('imAllowTranslate', 'default')
export const defaultAllowTranslate = writable(false)
export const isTranslateOn = derived(
  [allowTranslate, defaultAllowTranslate],
  ([$allowTranslate, $defaultAllowTranslate]) => {
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


export const chatroomTranslation = writable<TranslationMap>({})
const chatroomTranslationApi = writable<(data: ITranslationPayload[]) => Promise<{ data: ITranslatedResult[] }>>(null)

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

function getRequestKey(payload: ITranslationPayload) {
  return `${payload.fromLang}-${payload.toLang}-${payload.message}`
}

function localeNormalize(langCode: string) {
  if (langCode === 'zh') {
    return 'zh-cn'
  }
  return langCode.toLowerCase().replace('_', '-')
}

async function batchTranslateMessage(messageList: ITranslationPayload[]) {
  const notRequestedMessageList = messageList.filter(item => !requestedMessageMap[getRequestKey(item)])
  if (notRequestedMessageList.length > 0) {
    notRequestedMessageList.forEach(item => {
      requestedMessageMap[getRequestKey(item)] = true
    })
    const { data } = await get(chatroomTranslationApi)(notRequestedMessageList)
    if (data?.length > 0) {
      // batch translation must be in the same language
      const lang = notRequestedMessageList[0].toLang
      const translationMap: TranslationMap = get(chatroomTranslation)
      // TODO: too many translation may use too many memory, we may need to clear up the old translation
      data.forEach((item: ITranslationResponseData) => {
        translationMap[lang] = translationMap[lang] || {}
        translationMap[lang][item.message] = item.translatedMessage
      })
      chatroomTranslation.set(translationMap)
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
    fromLang: localeNormalize(fromLang),
    toLang: localeNormalize(toLang),
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
  ([$chatroomTranslation, $locale, $isTranslateOn, $chatroomTranslationApi]) => (msg: string, msgLang: string) => {
    const userLang = $locale;
    const normalizedUserLang = localeNormalize($locale);
    const normalizedMsgLang = localeNormalize(msgLang);
    // TODO: msgLang and userLang may be using '_', while translation api is using '-', may need to transform it
    if ($chatroomTranslationApi && allowTranslateLanguage.includes(normalizedUserLang) && (!$isTranslateOn || normalizedUserLang === normalizedMsgLang)) {
      return msg
    }
    const translatedMsg = $chatroomTranslation[userLang]?.[msg]
    if (translatedMsg) {
      return translatedMsg
    } else {
      translateMessage(
        msg,
        msgLang,
        userLang
      )
    }
    return msg
  }
)