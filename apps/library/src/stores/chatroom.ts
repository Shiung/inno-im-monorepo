import { writable, get, derived } from 'svelte/store'
import { im } from 'api'
import { NO_LANG } from '$src/constant'
import { getUseLang } from './language'
import { writableSyncLocalStorage } from './utils'

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

export const chatroomTranslation = writable<TranslationMap>({})

interface ITranslationPayload {
  fromLang: string
  toLang: string
  message: string
}

interface ITranslationResponseData {
  message: string,
  translatedMessage: string
}

async function batchTranslateMessage(messageList: ITranslationPayload[]) {
  if (messageList.length > 0) {
    const { data } = await im.chatroomTranslation({ body: { data: messageList } })
    if (data?.length > 0) {
      // batch translation must be in the same language
      const lang = messageList[0].toLang
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
const throttleBatchTime = 16

function translateMessage(msg: string, fromLang: string, toLang: string) {
  // if target language has been changed, we need to clear the batch queue
  if (batchQueue.length > 0 && batchQueue[0].toLang !== toLang) {
    batchQueue = []
  }
  // due to chatroom has many messages, we need to batch translate
  // we apply a throttle to avoid too many requests
  batchQueue.push({
    fromLang,
    toLang,
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

export const chatT = derived(
  [chatroomTranslation, getUseLang, isTranslateOn],
  ([$chatroomTranslation, $getUseLang, $isTranslateOn]) => (msg: string, msgLang: string) => {
    const userLang = $getUseLang()
    // TODO: msgLang and userLang may be using '_', while translation api is using '-', may need to transform it
    if (!$isTranslateOn || userLang === NO_LANG || userLang === msgLang) {
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