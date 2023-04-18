import { writable, get } from 'svelte/store'
import { writableSyncLocalStorage } from './utils'
import localeFetcher from '../locales/fetcher'

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
  if (locale) localStorage.setItem('locale', locale.replaceAll('"', ''))
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
  const _name = name.split('.')[0]
  const path = `${get(locale)}_${_name.replace('/', '_')}` // 檔名不能有/
  if (get(fetchedName).has(path)) return


  const fetcher = localeFetcher(path)
  const data = await fetcher()

  const renamed = putLocaleBeforeName(data.default)

  localeData.update((_data) => ({ ..._data, ... renamed }))
  fetchedName.update(names => names.add(path))

  triggerT()
}


// triggerT if locale changed
locale.subscribe(triggerT)

// all pages needs common
fetchLocaleData('common')
