import { im } from 'protobuf'

import type { IWsMasterEvent } from '../../core/wsMaster/types'
import type { ECommand } from 'protobuf/im/constants'

const requestEncode = (props: { pairId?: string | number, command: ECommand, data: { type_url: string, value?: Uint8Array } }) => im.request.encode({
  reqId: String(props.pairId || ''),
  command: props.command,
  data: {
    type_url: props.data.type_url,
    value: props.data.value || new ArrayBuffer(0)
  }
})

export const sendMessage = (event: IWsMasterEvent) => {
  const requestMessageEntity = im.requestMessageEntity.encode({
    contentType: event.data.contentType,
    chatId: event.data.chatId,
    iid: event.data.iid,
    replyTo: event.data.replyTo,
    content: event.data.content
  })

  return requestEncode({
    pairId: event?.pairId, command: im.enum.command.SEND_MESSAGE,
    data: { type_url: 'type.googleapis.com/RequestMessageEntity', value: requestMessageEntity }
  })
}

export const fetchMessages = (event: IWsMasterEvent) => {
  const fetchArgs = im.fetchArgs.encode({
    pointer: event.data.pointer,
    chatId: event.data.chatId
  })

  return requestEncode({
    pairId: event?.pairId, command: im.enum.command.FETCH_MESSAGES,
    data: { type_url: 'type.googleapis.com/FetchArgs', value: fetchArgs }
  })
}

export const subscribeChat = (event: IWsMasterEvent) => {
  const chatIdsWrapper = im.chatIdsWrapper.encode({
    chatIds: event.data.chatIds
  })

  return requestEncode({
    pairId: event?.pairId, command: im.enum.command.SUBSCRIBE_CHAT,
    data: { type_url: 'type.googleapis.com/ChatIdsWrapper', value: chatIdsWrapper }
  })
}

export const unsubscribeChat = (event: IWsMasterEvent) => {
  const chatIdsWrapper = im.chatIdsWrapper.encode({
    chatIds: event.data.chatIds
  })

  return requestEncode({
    pairId: event?.pairId, command: im.enum.command.UNSUBSCRIBE_CHAT,
    data: { type_url: 'type.googleapis.com/ChatIdsWrapper', value: chatIdsWrapper }
  })
}

export const reportAbuse = (event: IWsMasterEvent) => {
  const reportAbuseAegs = im.reportAbuseAegs.encode({
    userId: event.data.userId,
    reason: event.data.reason
  })

  return requestEncode({
    pairId: event?.pairId, command: im.enum.command.REPORT_ABUSE,
    data: { type_url: 'type.googleapis.com/ChatIdsWrapper', value: reportAbuseAegs }
  })
}

