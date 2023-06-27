import type { EChatroomSize } from './constant'
import { createStoreContext } from 'utils/storeContext'

export interface IChatroomEnv {
  displayType: 'window' | 'block'
  height: number
  isOpen: boolean
  size: `${EChatroomSize}`
}

export const initEnv: IChatroomEnv = {
  displayType: 'window',
  height: 0,
  isOpen: false,
  size: 'default'
}

export const [setEnv, getEnv] = createStoreContext<IChatroomEnv>('chatRoomEnv', initEnv)

export interface IChatroomInfo {
  chatId: string
  iid: number
  vipLimit: number
  frequency: number
}

export const initInfo: IChatroomInfo = {
  chatId: '',
  iid: 0,
  vipLimit: 0,
  frequency: 5000
}

export const [setInfo, getInfo] = createStoreContext<IChatroomInfo>('chatroomInfo', initInfo)


export interface IUserInfo {
  userAccount: string
  userToken: string
  userVip: number
}

export const initUserInfo: IUserInfo = {
  userAccount: '',
  userToken: '',
  userVip: 0,
}

export const [setUserInfo, getUserInfo] = createStoreContext<IUserInfo>('chatRoomUserInfo', initUserInfo)
