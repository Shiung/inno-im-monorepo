import type { ILanguages } from 'env-config'
import type { IRequest, IMessageEntity } from 'protobuf/im/types'
import type { withData } from '../types'

export interface IChatMessage {
  type: 'message'
  id: string
  blackList: boolean
  source: string
  sourceInfo: {
    nickName: string
    vip: number
    avatar: number
    sportAccount: string
    accountType: number
    enabledTitle: number
  },
  language: ILanguages
  data: {
    message: string
    reply: null | string
  }
}

export interface IChatroomPastMessage {
  query: {
    roomId: number
    cursor?: string
    quantity?: number
  }
  body: null
  res: withData<{
    list: IRequest[]
  }>
}
