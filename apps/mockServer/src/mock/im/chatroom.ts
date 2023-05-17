import { mock, Random } from 'mockjs'
import { withData } from './utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

const expert: IMockData[] = [
  {
    url: '/v1/chat-room/past-message',
    timeout: 500,
    response: ({ query }) => mock(withData<Types.IChatroomPastMessage>({
      list: Array.from({ length: Number(query.quantity) || 30 }, () => ({
        type: "message",
        id: '@sentence',
        blackList: false,
        source: "@name",
        sourceInfo: {
          nickName: "@name",
          vip: Random.integer(0, 12),
          avatar: Random.integer(0, 100),
          sportAccount: "@name",
          accountType: Random.integer(0, 1), 
          enabledTitle: Random.integer(0, 3)
        },
        language: "zh_HK",
          data: {
            message: "@sentence",
            reply: null
          }
       }))
    }))
  },
]

export default expert
