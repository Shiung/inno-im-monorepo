import type { EChatroomSize } from './constant'
import { createStoreContext } from 'utils/storeContext'
import type { ISportMarketSummary } from '$containers/BetDetail/types'

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
  device: 'pc' | 'wap'
  size: `${EChatroomSize}`
}

export const initInfo: IChatroomInfo = {
  roomId: 124,
  userId: 'loki',
  userVip: 6,
  userCurrency: 'CNY',
  isLogin: true,
  isCharged: true,
  vipLimit: 6,
  frequency: 5000,
}

export const [setInfo, getInfo] = createStoreContext<IChatroomInfo>('chatroomInfo', initInfo)

export const initEnv: IChatroomEnv = {
  displayType: 'window',
  height: 0,
  minimize: true,
  showBetList: false,
  device: 'wap',
  size: 'default'
}

export const [setEnv, getEnv] = createStoreContext<IChatroomEnv>('chatRoomEnv', initEnv)

export interface IPlatformInfo {
  sportMarketSummary: ISportMarketSummary
}

export const initPlatformInfo: IPlatformInfo = {
  sportMarketSummary: null
}

export const [setPlatformInfo, getPlatformInfo] = createStoreContext<IPlatformInfo>('chatRoomPlatformInfo', initPlatformInfo)
