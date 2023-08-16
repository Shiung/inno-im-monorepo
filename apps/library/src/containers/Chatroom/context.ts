import { createStoreContext } from 'utils/storeContext'
import type { EChatroomSize } from './constant'
import type { ISportMarketSummary } from '$containers/BetDetail/types'

export interface IChatroomInfo {
  displayType: 'window' | 'block'
  size: `${EChatroomSize}`
  useScrollCollapse: boolean
  height: number
  chatId: string
  iid: number
  showBetEnable: boolean
  expandAnimation: boolean
  header: 'normal' | 'text' | 'deposit'
  betListSheetContainerId?: string
  isDefaultTranslate?: boolean
  isTranslationFeatureOn?: boolean
}

export const initInfo: IChatroomInfo = {
  displayType: 'window',
  size: 'default',
  useScrollCollapse: false,
  height: 0,
  chatId: '',
  iid: 0,
  showBetEnable: true,
  expandAnimation: true,
  header: 'normal',
  betListSheetContainerId: '',
  isDefaultTranslate: false
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
