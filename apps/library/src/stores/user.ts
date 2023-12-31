import { writable } from 'svelte/store'
import type { IVipList, IKeyInfo  } from 'api/im/types'

export interface IUserInfo {
  userVip: number
  userCurrency: string
}

export interface IUserAuth {
  userAccount: string
  userToken: string
}

export const initUserInfo: IUserInfo = {
  userVip: 0,
  userCurrency: 'CNY',
}

export const initUserAuth: IUserAuth = {
  userAccount: '',
  userToken: ''
}

export const initUserKeyInfo: IKeyInfo = {
  remainCount: 0,
  totalCount: 0,
  keyCdList: []
} 

export const userAuth = writable(initUserAuth)
export const userInfo = writable(initUserInfo)
export const userVipList = writable<IVipList[]>([])
export const userKeyInfo = writable(initUserKeyInfo)

export const setUserAuth = (_info: Partial<IUserAuth>) => userAuth.update((e) => ({ ...e, ..._info }))
export const setUserInfo = (_info: Partial<IUserInfo>) => userInfo.update((e) => ({ ...e, ..._info }))
