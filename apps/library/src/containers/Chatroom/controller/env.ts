import { writable } from 'svelte/store'

export interface IChatroomEnv {
  device: 'pc' | 'wap'
  animation: boolean
  vipLimit: number
  frequency: number
  subscribeBindingChatroom: boolean
}

export const initEnv: IChatroomEnv = {
  device: 'wap',
  animation: false,
  vipLimit: 0,
  frequency: 5000,
  subscribeBindingChatroom: false
}

export const chatEnv = writable(initEnv)
export const setChatEnv = (_env: Partial<IChatroomEnv>) => chatEnv.update((e) => ({ ...e, ..._env }))


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

export const userInfo = writable(initUserInfo)
export const setChatUserInfo = (_info: Partial<IUserInfo>) => userInfo.update((e) => ({ ...e, ..._info }))
