import type { EChatroomSize } from './constant'
import { createStoreContext } from 'utils/storeContext'
import type { ISportMarketSummary } from '$containers/BetDetail/types'

export interface IChatroomEnv {
  displayType: 'window' | 'block'
  height: number
  isOpen: boolean
  size: `${EChatroomSize}`
  showBetList: boolean
  device: 'pc' | 'wap'

}

export const initEnv: IChatroomEnv = {
  displayType: 'window',
  height: 0,
  isOpen: false,
  size: 'default',
  showBetList: false,
  device: 'wap',
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

export interface IOrdersInfo {
  sportMarketSummary: ISportMarketSummary
}

export const initOrdersInfo: IOrdersInfo = {
  sportMarketSummary: null
}

export const [setOrdersInfo, getOrdersInfo] = createStoreContext<IOrdersInfo>('chatRoomOrdersInfo', initOrdersInfo)

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

export const [setUserInfo, getUserInfo] = createStoreContext<IUserInfo>('chatRoomUserInfo', initUserInfo)
