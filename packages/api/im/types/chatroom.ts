import type { IPushMessageEntity } from 'protobuf/im/types'
import type { withData } from '../types'

export type IChatMessage = IPushMessageEntity

export interface IChatroomPastMessage {
  query: {
    roomId: number
    cursor?: string
    quantity?: number
  }
  body: null
  res: withData<{
    list: IChatMessage[]
  }>
}
