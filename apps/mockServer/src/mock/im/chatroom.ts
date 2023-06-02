import { mock, Random } from 'mockjs'
import { withData } from './utils'

import { ECommand } from 'protobuf/im/constants'
import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

export const messageEntityData = (idx?: number) => mock({
  msgId: Random.integer(100000, 999999),
  contextType: Random.integer(0, 2),
  vdId: 0,
  sender: Random.integer(0, 100000),
  senderName: '@name',
  chatId: Random.integer(0, 100000),
  vip: Random.integer(0, 12),
  avatar: Random.integer(0, 100),
  replayTo: Random.integer(0, 100000),
  content: '@sentence',
  visible: Random.integer(0, 2),
  timestamp: Date.now() + (idx || 0)
})

export const pushMessageData = (props: { id?: string, value: any }) => {
  const reqId = props?.id || ''
  const value = props.value

  return {
    reqId,
    command: ECommand.PUSH_MESSAGE,
    data: { value }
  }
}

const expert: IMockData[] = [
  {
    url: '/v1/chat-room/past-message',
    timeout: 500,
    response: ({ query }) => mock(withData<Types.IChatroomPastMessage>({
      list: Array.from({ length: Number(query.quantity) || 30 }, (_, idx) => ({
        ...pushMessageData({ value: messageEntityData(idx) })
      }))
    }))
  },
]

export default expert
