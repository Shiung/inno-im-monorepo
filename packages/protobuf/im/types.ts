import type { ECommand, EContentType, EVisible } from './constants'

interface IGoogleProtobufAny {
  type_url?: string
  value: ArrayBuffer
}

export interface IRequest {
  reqId: string
  command: ECommand
  data: IGoogleProtobufAny
}

export interface IRequestMessageEntity {
  contentType: EContentType
  chatId: string
  iid: number
  replyTo: number
  content: string
}

export interface IPush {
  reqId: string
  command: ECommand
  code: number
  msg: string
  data: IGoogleProtobufAny
}

export interface IPushMessageEntity {
  msgId: number
  contentType: EContentType
  vdId: number
  senderName: string
  isSelf: boolean
  chatId: string
  iid: number
  vip: number
  avatar: number
  replyTo: number
  content: string
  visible: EVisible
  timestamp: number
}
