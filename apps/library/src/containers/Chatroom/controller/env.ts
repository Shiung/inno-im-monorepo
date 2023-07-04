import { writable } from 'svelte/store'

export interface IChatroomEnv {
  device: 'pc' | 'wap'
  vipLimit: number
  frequency: number
  subscribeBindingChatroom: boolean
}

export const initEnv: IChatroomEnv = {
  device: 'wap',
  vipLimit: 0,
  frequency: 5000,
  subscribeBindingChatroom: true
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
