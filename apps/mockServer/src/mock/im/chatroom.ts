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
]

export default expert
