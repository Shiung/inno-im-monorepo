import { createStoreContext } from 'utils/storeContext'
import type { ILanguages } from 'env-config'

export interface IChatroomInfo {
  roomId: number
  userId: string
  userVip: number
  userCurrency: string
  isLogin: boolean
  isCharged: boolean
  vipLimit: number
  frequency: number
}

export interface IChatroomEnv {
  displayType: 'window' | 'block'
  height: number
  minimize: boolean
  showBetList: boolean
}

export const initInfo: IChatroomInfo = {
  roomId: 124,
  userId: 'loki',
  userVip: 6,
  userCurrency: 'CNY',
  isLogin: true,
  isCharged: true,
  vipLimit: 6,
  frequency: 5000
}

export const [setInfo, getInfo] = createStoreContext<IChatroomInfo>('chatroomInfo', initInfo)

export const initEnv: IChatroomEnv = {
  displayType: 'window',
  height: 0,
  minimize: true,
  showBetList: false
}

export const [setEnv, getEnv] = createStoreContext<IChatroomEnv>('chatRoomEnv', initEnv)
