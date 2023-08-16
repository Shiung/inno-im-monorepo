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

export const chatroomTranslation = writable<Translation>({})

export const chatT = derived(
  [locale, isTranslateOn],
  ([$locale, $isTranslateOn]) => (msg: string, translatedMessage: {[langCode: string]: string}) => {
    // locale may be using '_', while translation api is using '-', may need to transform it
    if (!$isTranslateOn) {
      return msg
    }
    return translatedMessage?.[$locale] || msg
  }
)