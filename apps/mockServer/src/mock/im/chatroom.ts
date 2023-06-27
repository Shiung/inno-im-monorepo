import { mock, Random } from 'mockjs'
import { withData, genSelfOrder } from './utils'

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
            ...genSelfOrder(Number(query.iid))
          }))
        })
      )
  },
  {
    url: '/product/chat/betOrder/getOthers',
    timeout: 500,
    response: ({ query }) => 
      mock(
        withData<Types.IChatroomOtherOrders>({
          list: Array.from({ length: Number(query.quantity) || 10 }, () => ({
            iid: Number(query.iid),
            nickName: '@name',
            account: '@name',
            vip: Random.integer(1, 9),
            avatar: Random.integer(1, 10),
            betOrder: {...genSelfOrder(Number(query.iid))}
          }))
        })
      )
  }
]

export default expert
