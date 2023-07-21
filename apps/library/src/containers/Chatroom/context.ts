import { createStoreContext } from 'utils/storeContext'
import type { EChatroomSize } from './constant'
import type { ISportMarketSummary } from '$containers/BetDetail/types'

export interface IChatroomInfo {
  displayType: 'window' | 'block'
  size: `${EChatroomSize}`
  useScrollCollapse: boolean
  height: number
  isOpen: boolean
  showBetList: boolean
  chatId: string
  iid: number
}

export const initInfo: IChatroomInfo = {
  displayType: 'window',
  size: 'default',
  useScrollCollapse: false,
  height: 0,
  isOpen: false,
  showBetList: false,
  chatId: '',
  iid: 0,
}

export const [setInfo, getInfo] = createStoreContext<IChatroomInfo>('chatroomInfo', initInfo)

export interface IOrdersInfo {
  sportMarketSummary: ISportMarketSummary
  selfOrdersCallback: () => Promise<any>
  followOrdersCallback: (data) => Promise<any>
}

export const initOrdersInfo: IOrdersInfo = {
  sportMarketSummary: null,
  selfOrdersCallback: null,
  followOrdersCallback: null
}

export const [setOrdersInfo, getOrdersInfo] = createStoreContext<IOrdersInfo>('chatRoomOrdersInfo', initOrdersInfo)
