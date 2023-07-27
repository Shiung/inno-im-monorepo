import type { EChatroomSize } from './constant'

export type SizeChangedOption = {
  size: `${EChatroomSize}`
  transition: boolean
}

export type SizeChangedCallback = (option: SizeChangedOption) => void

export type ToggledCallback = (open: boolean) => void