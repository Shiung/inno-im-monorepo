import { writable, get } from 'svelte/store'
import { writableSyncLocalStorage } from './utils'
import localeFetcher from '../locales/fetcher'
import { im } from 'api'

import type { ILanguages } from 'env-config/types'

export type ITransStore = (
  key: string,
  replace?: {
    [key: string]: string | number
  }
) => string

// 為了配合 universe-portal-wap 專案 的語系同步
const getProtalLocalandSet = () => {
  const locale = localStorage.getItem('locale.current')
  if (locale) localStorage.setItem('locale', locale.replace(/"/g, ''))
}

getProtalLocalandSet()


const fetchedName = writable(new Set())
export const localeData = writable({})
export const locale = writableSyncLocalStorage<ILanguages>('locale', 'zh_CN')

export const t = writable<ITransStore>((key, replace) => {
  fetchLocaleData(key)
  const _key = `${get(locale)}_${key}`
  let _str = get(localeData)[_key] || '\u2003'

  if (!replace) return _str
  for (const [key, val] of Object.entries(replace)) {
    _str = _str.replace(`\{${key}\}`, val)
  }

  return _str
})

const triggerT = () => t.update(func => func)

const putLocaleBeforeName = (data: { [key:string]: string }) => {
  const renamed = {}
  for (const [key, text] of Object.entries(data)) {
    const _key = `${get(locale)}_${key}`
    renamed[_key] = text
  }
  return renamed
}

const fetchLocaleData = async (name: string) => {
  if (!name) return
  const _name = name.split('.')[0]
  const path = `${get(locale)}_${_name.replace('/', '_')}` // 檔名不能有/

  if (get(fetchedName).has(path)) return

  const fetcher = localeFetcher(path)
  fetchedName.update(names => names.add(path))

  const data = await fetcher()
  const renamed = putLocaleBeforeName(data.default)

  localeData.update((_data) => ({ ..._data, ... renamed }))
  triggerT()
}

type AdminLangInfo = Awaited<ReturnType<typeof im.webAnchorLanguage>>['data']
export const adminLangInfo = writable<AdminLangInfo>(null)

export const fetchAdminLangList = async () => {
  try {
    const response = await im.webAnchorLanguage()
    if (response.data) {
      adminLangInfo.set(response.data)
    }
  } catch (error) {
    adminLangInfo.set(null)
  }
}

// triggerT if locale changed
locale.subscribe(triggerT)

// all pages needs common
fetchLocaleData('common')
