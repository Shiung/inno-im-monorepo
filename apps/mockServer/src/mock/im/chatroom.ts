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

export const messageEntityData = (idx?: number, props?: MessageEntityDataProps) => {
  const _content = props?.content
  const _sender = props?.sender

  return mock({
    msgId: Random.integer(100000, 999999),
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
    timestamp: Date.now() + (idx || 0)
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

const expert: IMockData[] = [
  {
    url: '/v1/chat-room/past-message',
    timeout: 500,
    response: ({ query }) => mock(withData<Types.IChatroomPastMessage>({
      list: Array.from({ length: Number(query.quantity) || 30 }, (_, idx) => ({
        //...pushMessageData({ value: messageEntityData(idx) })
        ...messageEntityData(idx)
      }))
    }))
  },
]

export default expert
