import { writable } from 'svelte/store'

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

export const userAuth = writable(initUserAuth)
export const userInfo = writable(initUserInfo)
export const setUserAuth = (_info: Partial<IUserAuth>) => userAuth.update((e) => ({ ...e, ..._info }))
export const setUserInfo = (_info: Partial<IUserInfo>) => userInfo.update((e) => ({ ...e, ..._info }))
