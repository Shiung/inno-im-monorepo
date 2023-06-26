import { mock, Random } from 'mockjs'
import { withData } from './utils'

import { ECommand } from 'protobuf/im/constants'
import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

export interface MessageEntityDataProps {
  content?: string
  sender?: string
  isSelf?: boolean
  chatId?: string
  iid?: number
}

export const messageEntityData = (ts: number = Date.now(), props?: MessageEntityDataProps) => {
  const _content = props?.content
  const _sender = props?.sender

  return mock({
    msgId: ts,
    contentType: 1,
    vdId: 4,
    senderName: _sender || '@name',
    isSelf: !!props?.isSelf,
    chatId: props?.chatId || '@guid',
    iid: props?.iid || Random.integer(0, 999999),
    vip: Random.integer(0, 12),
    avatar: Random.integer(0, 100),
    replyTo: Random.integer(0, 100000),
    content: _content || '@sentence',
    visible: Random.integer(0, 2),
    timestamp: ts
  })
}

export const pushMessageData = (props: { reqId?: string, value?: Uint8Array }) => {
  const reqId = props.reqId || ''
  const value = props.value || new Uint8Array()

  return {
    reqId,
    command: ECommand.PUSH_MESSAGE,
    code: 0,
    msg: '',
    data: { value }
  }
}

let lastDateId = Date.now()

const expert: IMockData[] = [
  {
    url: '/v1/chat-room/past-message',
    timeout: 500,
    response: ({ query }) => {
      const listLength = Number(query.quantity) || 30
      const list = Array.from({ length: listLength }, (_, idx) => ({
        // ...pushMessageData({ value: messageEntityData(idx) })
        ...messageEntityData(lastDateId - (listLength - idx))
      }))

      lastDateId = list[0].msgId

      return mock(withData<Types.IChatroomPastMessage>({ list }))
    }
  },
  {
    url: '/product/business/bets/ordersWithIid',
    timeout: 500,
    response: ({ query }) =>
      mock(
        withData<Types.IChatroomSelfOrders>({
          list: Array.from({ length: Number(query.quantity) || 10 }, () => ({
            uuid: RegExp(/^\d{12}-[a-z0-9]{6}$/),
            ante: Random.integer(0, 1000000),
            totalAnte: Random.integer(0, 1000000),
            payout: 0,
            mayWinAmount: Random.integer(0, 1000000),
            netWin: Random.integer(0, 1000000),
            parlayBet: false,
            parlay: 1,
            option: 1,
            canceled: false,
            details: [
              {
                sid: 1,
                tournamentName: '@region',
                iid: Number(query.iid),
                homeName: '@region',
                awayName: '@region',
                kickOffTime: '@datetime',
                odds: `${Random.float(0, 10, 1, 2)}`,
                market: Random.pick(['ah', 'tg', 'cs_1st', '1x2_1st', 'ou_1st', 'ou', 'ah_1st']),
                betOn: Random.pick(['a', '2-3', '2-2', 'ud', 'h']),
                conditions: `${Random.float(-10, 10, 1, 1)}`,
                settle: 0,
                outright: false,
                inplay: false,
                period: Random.string(6),
                stage: '',
                cashoutPeriod: '',
                cashoutStage: '',
                orderPhase: Random.integer(1, 4),
                homeScore: `${Random.integer(1, 10)}`,
                awayScore: `${Random.integer(1, 10)}`,
                probability: `${Random.float(0, 1, 1, 5)}`,
                vendor: Random.string(6),
                tid: 25741,
                homeId: 342277,
                awayId: 45,
                safeFlag: true,
                scoreType: 'NORMAL',
                matchScore: { h: '0', a: '0' }
              }
            ],
            marketType: Random.pick(['ML', 'EU', 'IN', 'HK']),
            status: 2,
            cashOut: false,
            currency: Random.pick(['CNY', 'nIDR', 'WBTC_ERC20', 'BCH']),
            tnPriority: 50131,
            orderStatus: 0,
            safeFlag: true,
            betTime: '@datetime'
          }))
        })
      )
  }
]

export default expert
