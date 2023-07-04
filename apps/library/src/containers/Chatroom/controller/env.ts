import { writable } from 'svelte/store'

export interface IUserInfo {
  userAccount: string
  userToken: string
  userVip: number
  userCurrency: string
}

export const initUserInfo: IUserInfo = {
  userAccount: '',
  userToken: '',
  userVip: 0,
  userCurrency: 'CNY',
}

export let userInfo = writable(initUserInfo)
export const setChatUserInfo = (_info: Partial<IUserInfo>) => userInfo.update((e) => ({ ...e, ..._info }))

