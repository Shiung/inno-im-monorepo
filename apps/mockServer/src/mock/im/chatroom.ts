import { mock, Random } from 'mockjs'
import { prefix, withData, genSelfOrder } from './utils'

import { ECommand } from 'protobuf/im/constants'
import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

export interface MessageEntityDataProps {
  content?: string
  contentType?: number
  sender?: string
  isSelf?: boolean
  chatId?: string
  iid?: number
}

export const messageEntityData = (ts: number = Date.now(), props?: MessageEntityDataProps) => {
  const _content = props?.content
  const _sender = props?.sender
  const _contentType = props?.contentType

  return mock({
    msgId: ts,
    contentType: _contentType || 1,
    vdId: 4,
    senderName: _sender || '@name',
    isSelf: !!props?.isSelf,
    chatId: props?.chatId || '@guid',
    iid: props?.iid || Random.integer(0, 999999),
    vip: Random.integer(0, 12),
    avatar: String(Random.integer(0, 100)),
    replyTo: Random.integer(0, 100000),
    content: _content || '@sentence',
    visible: Random.integer(0, 2),
    timestamp: ts,
    ...(props?.chatId && { houseId: props?.chatId }),
    lang: Random.pick([
      'zh_CN',
      'zh_HK',
      'en_US',
      'ms_MY',
      'id_ID',
      'vi_VN',
      'hi_IN',
      'ja_JP',
      'ko_KR',
      'th_TH',
      'pt_PT'
    ])
  })
}

export const pushMessageData = (props: { reqId?: string; value?: Uint8Array }) => {
  const reqId = props.reqId
  const value = props.value || new Uint8Array()

  return {
    ...(reqId && { reqId }),
    command: ECommand.PUSH_MESSAGE,
    code: 0,
    msg: '',
    data: { value }
  }
}

export interface ChatSettingDataProps {
  timeInterval: number
  chatLimitType: number
  vip: number
  depositLimit: any[]
}

export const chatSettingData = (props?: ChatSettingDataProps) => {
  return mock({
    timeInterval: props?.timeInterval || Random.integer(0, 5) * 1000,
    chatLimitType: props?.chatLimitType || Random.integer(0, 2),
    vip: props?.vip || Random.integer(0, 10),
    depositLimit: props?.depositLimit || [
      {
        currency: 'CNY',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'MYR',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'IDR',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'VND',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'USD',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'HKD',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'KRW',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'INR',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'THB',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'JPY',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'USDT_OMNI',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'USDT_ERC20',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'USDT_TRC20',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'USDC_ERC20',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'BTC',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'ETH',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'LTC',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'DASH',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'DOGE',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'BCH',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'ETC',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'DAI_ERC20',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'AAVE_ERC20',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'WBTC_ERC20',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'UNI_ERC20',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'TRX',
        amount: Random.float(0.00000001, 0.000001)
      },
      {
        currency: 'nVND',
        amount: Random.integer(1, 200)
      },
      {
        currency: 'nIDR',
        amount: Random.integer(1, 200)
      }
    ]
  })
}

export const pushChatSettingData = (props: { reqId?: string; value?: Uint8Array }) => {
  const reqId = props.reqId
  const value = props.value || new Uint8Array()

  return {
    ...(reqId && { reqId }),
    command: ECommand.CHAT_SETTING,
    code: Random.pick([0, 4007, 4008]),
    msg: '',
    data: { value }
  }
}

const expert: IMockData[] = [
  {
    url: `${prefix}/product/business/bets/ordersWithIid`,
    timeout: 500,
    response: ({ query }) =>
      mock(
        withData<Types.IChatroomSelfOrders>({
          list: Array.from({ length: Number(query.quantity) || 10 }, () => ({
            ...genSelfOrder(Number(query.iid))
          }))
        })
      )
  }
]

export default expert