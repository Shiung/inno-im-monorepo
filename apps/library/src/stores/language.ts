import { writable, get } from 'svelte/store'
import { locale } from '$stores'
import { im } from 'api'

type AdminLangInfo = {
  defaultLangCode: string
  langs: { [key: string]: boolean }
}
type LangMap = { [key: string]: string }

export const adminLangInfo = writable<AdminLangInfo>({ defaultLangCode: '', langs: {} })
export const langMap = writable<LangMap>({})

const fetchAdminLangList = async () => {
  try {
    const response = await im.webAnchorLanguage()
    if (response.data) {
      const map = response.data.lang.reduce((map, lang) => Object.assign(map, { [lang.code]: true }), {})
      adminLangInfo.set({
        defaultLangCode: response.data.defaultLangCode,
        langs: map
      })
    }
  } catch (error) {
    adminLangInfo.set(null)
  }
}

const fetchPlatformLangMap = async () => {
  try {
    const response = await im.webAnchorLanguageConstants()
    if (response?.data?.lang?.length) {
      const map = response.data.lang.reduce((map, lang) => Object.assign(map, { [lang.code]: lang.thirdCode }), {})
      langMap.set(map)
    }
  } catch (error) {
    adminLangInfo.set(null)
  }
}

export const fetchLangInfo = () => {
  fetchAdminLangList()
  fetchPlatformLangMap()
}

type GetUseLang = () => string
export const getUseLang = writable<GetUseLang>(() => {
  const { langs, defaultLangCode } = get(adminLangInfo) || {}

  if (langs && defaultLangCode) {
    return langs[get(locale)] ? langMap[get(locale)] : defaultLangCode
  }

  return get(locale)
})
const triggerGetUseLang = () => getUseLang.update(func => func)
locale.subscribe(triggerGetUseLang)
adminLangInfo.subscribe(triggerGetUseLang)
langMap.subscribe(triggerGetUseLang)


type FilterByUseLang = <T extends { languageType: string }>(array: T[]) => T[]
export const filterByUseLang = writable<FilterByUseLang>((array) => {
  const useLang = get(getUseLang)()

  return array.filter(item => item.languageType === useLang)
})
const triggerFilterByUseLang = () => filterByUseLang.update(func => func)
getUseLang.subscribe(triggerFilterByUseLang)