import type { TKeyOfCurrency } from '$src/types'
import { writable } from 'svelte/store'

export interface IChatroomSetting {
  errorCode: number
  vip: number
  timeInterval: number
  depositLimit: Array<{ currency: TKeyOfCurrency, amount: number }>
  chatLimitType: number // 0: unlimited, 1: deposit, 2: vip
}

export const initChatroomSetting = {
  errorCode: 0,
  vip: 0,
  timeInterval: 0,
  chatLimitType: 0,
  depositLimit: [],
}

export const chatroomSetting = writable(initChatroomSetting)
export const setChatroomSetting = (_info: Partial<IChatroomSetting>) => chatroomSetting.update((e) => ({ ...e, ..._info }))