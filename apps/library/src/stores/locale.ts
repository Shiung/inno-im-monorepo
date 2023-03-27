import { writable, get } from 'svelte/store'
import { writableSyncLocalStorage } from './utils'

type ITransStore = (
  key: string,
  replace?: {
    [key: string]: string
  }
) => string

const fetchedName = writable(new Set())
export const localeData = writable({})
export const locale = writableSyncLocalStorage('locale', 'zh_CN')

export const t = writable<ITransStore>((key, replace) => {
  console.log('============t==========', get(locale)) 
  fetchLocaleData('test')
  return `t_${key}`
})

const switchFileFetcher = (path: string) => {
  switch (path) {
    case 'ZH_CN_test': return () => import('../locales/zh_CN_test.json')
    default: return () => import('../locales/zh_CN_test.json')
  }
}

const fetchLocaleData = async (name: string) => {
  const path = `${get(locale)}_${name}`
  const fetcher = switchFileFetcher(path)
  const data = await fetcher()
  console.log('================?=======================', data.default)
}


