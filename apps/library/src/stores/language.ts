import { writable } from 'svelte/store'
import { im } from 'api'

type AdminLangInfo = Awaited<ReturnType<typeof im.webAnchorLanguage>>['data']
type LangMap = { [key: string]: string }

export const adminLangInfo = writable<AdminLangInfo>(null)
export const langMap = writable<LangMap>(null)

const fetchAdminLangList = async () => {
  try {
    const response = await im.webAnchorLanguage()
    if (response.data) {
      adminLangInfo.set(response.data)
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