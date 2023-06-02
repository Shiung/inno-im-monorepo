import { ECommand, EContentType, EVisible } from './constants'

export interface IRequest {
  reqId: string
  command: ECommand
  data: {
    type_url?: string
    value: ArrayBuffer
  }
}

export interface IMessageEntity {
  msgId: number
  contentType: EContentType
  vdId: number
  sender: number
  senderName: string
  chatId: number
  vip: number
  avatar: number
  replyTo: number
  content: string
  visible: EVisible
  timestamp: number
}
