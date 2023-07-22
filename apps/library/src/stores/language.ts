import { writable, get } from 'svelte/store'
import { locale } from '$stores'
import { im } from 'api'

type AdminLangInfo = {
  defaultLang: string
  langs: { [key: string]: boolean }
}
const initAdminLangInfo = { defaultLang: '', langs: {} }
export const adminLangInfo = writable<AdminLangInfo>(initAdminLangInfo)
const fetchAdminLangList = async () => {
  try {
    const response = await im.webAnchorLanguage()
    if (response.data) {
      const map = response.data?.lang?.reduce((map, lang) => Object.assign(map, { [lang.code]: true }), {}) || {}
      adminLangInfo.set({
        defaultLang: response.data?.defaultLang || '',
        langs: map
      })
    }
  } catch (error) {
    console.error(error)
    adminLangInfo.set(initAdminLangInfo)
  }
}

type LangMap = { [key: string]: string }
const initLangMap = {}
export const langMap = writable<LangMap>(initLangMap)
const fetchPlatformLangMap = async () => {
  try {
    const response = await im.webAnchorLanguageConstants()
    if (response?.data?.lang?.length) {
      const map = response.data?.lang?.reduce((map, lang) => Object.assign(map, { [lang.code]: lang.thirdCode }), {}) || {}
      langMap.set(map)
    }
  } catch (error) {
    console.error(error)
    langMap.set(initLangMap)
  }
}

export const fetchLangInfo = () => {
  fetchAdminLangList()
  fetchPlatformLangMap()
}

const NO_LANG = 'NO-LANG'
type GetUseLang = () => string
export const getUseLang = writable<GetUseLang>(() => {
  const { langs, defaultLang } = get(adminLangInfo) || {}
  const useLangMap = get(langMap) || {}
  const userLocale = get(locale)

  if (langs && defaultLang) {
    return langs[useLangMap[userLocale]] ? useLangMap[userLocale] : defaultLang
  }

  return NO_LANG
})
const triggerGetUseLang = () => getUseLang.update(func => func)
locale.subscribe(triggerGetUseLang)
adminLangInfo.subscribe(triggerGetUseLang)
langMap.subscribe(triggerGetUseLang)

type FilterListByLang = <T extends { languageType: string }>(array: T[]) => T[]
export const filterListByLang = writable<FilterListByLang>((array) => {
  const useLang = get(getUseLang)()
  console.log('⛔️⛔️⛔️⛔️⛔️ filterListByLang useLang', useLang)
  if(useLang === NO_LANG) return []

  return array.filter(item => item.languageType === useLang)
})
const triggerFilterListByLang = () => filterListByLang.update(func => func)
getUseLang.subscribe(triggerFilterListByLang)