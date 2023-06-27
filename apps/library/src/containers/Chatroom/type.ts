import type { EChatroomSize } from './constant'

export type SizeChangedOption = {
  size: `${EChatroomSize}`
  transition: boolean
}

export type RouterRedirectOption = {
  location: string
  method?: 'push' | 'replace'
}

export type SizeChangedCallback = (option: SizeChangedOption) => void

export type ToggledCallback = (open: boolean) => void

export type DestroyedCallback = (...args: any[]) => any

export type RouterRedirectCallback = (option: RouterRedirectOption) => void