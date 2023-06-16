import type { EChatroomSize } from './constant'
import { createStoreContext } from 'utils/storeContext'

export interface IChatroomInfo {
  roomId: number
  userId: string
  userVip: number
  isLogin: boolean
  isCharged: boolean
  vipLimit: number
  frequency: number
}

export interface IChatroomEnv {
  displayType: 'window' | 'block'
  height: number
  minimize: boolean
  size: `${EChatroomSize}`
}

export const initInfo: IChatroomInfo = {
  roomId: 124,
  userId: 'loki',
  userVip: 6,
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
  size: 'default'
}

export const [setEnv, getEnv] = createStoreContext<IChatroomEnv>('chatRoomEnv', initEnv)
