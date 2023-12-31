import impb from 'protobuf/im/node'
import {
  pushEncode,
  pushMessageEntityEncode,
  fetchMessages,
  fetchOtherOrders,
  pushChatSettingEncode,
} from './messageGenerator'
import { mockMessageEntity, mockChatSetting } from '../../mock/im/chatroom'
import { getRandomItemFromArray } from 'utils'
import { subscribed } from './store'

import type { IRequest } from 'protobuf/im/types'
import type { RawData, WebSocket } from 'ws'

let sendInterval: NodeJS.Timer

const pushMessage = (props?: { reqId?: string, value?: Uint8Array }) => {
  const chatId = getRandomItemFromArray(Array.from(subscribed))
  const value = props?.value || pushMessageEntityEncode(mockMessageEntity({ chatId }, Date.now()))

  return pushEncode({
    reqId: '',
    command: impb.enum.command.PUSH_MESSAGE,
    data: { value }
  })
}

const pushChatSetting = (props?: { reqId?: string, value?: Uint8Array }) => {
  const value = props?.value || pushChatSettingEncode(mockChatSetting())
  return pushEncode({
    reqId: props?.reqId,
    command: impb.enum.command.CHAT_SETTING,
    data: { value }
  })
}

export const onConnection = (ws: WebSocket) => {
  if (!impb.done) {
    setTimeout(() => onConnection(ws), 10)
    return
  }

  const chatSettingBuffer = pushChatSetting()
  if(chatSettingBuffer) ws.send(chatSettingBuffer)

  sendInterval = setInterval(() => {
    const buffer = pushMessage()

    if (buffer) ws.send(buffer)
  }, 1000)
}

export const onClose = () => {
  clearInterval(sendInterval)
}

const onReceivePing = (ws: WebSocket) => {
  const buffer = impb.push?.encode({ command: impb.enum.command.PING, code: 0, msg: '', data: { value: new Uint8Array() } })
  if (buffer) ws.send(buffer)
}

const sendReply = (ws: WebSocket, data: IRequest) => {
  const buffer = pushEncode({
    reqId: data.reqId,
    command: data.command,
    msg: 'OK',
    data: { type_url: data.data.type_url, value: new Uint8Array() }
  })

  if (buffer) ws.send(buffer)
}

const onReceiveSendMessage = (ws: WebSocket, data: IRequest) => {
  sendReply(ws, data)
  const message = impb.requestMessageEntity?.decode(data.data.value as Uint8Array)

  const pushMsg = pushMessageEntityEncode({
    content: message.content,
    contentType: message.contentType,
    senderName: '',
    isSelf: true,
    chatId: message.chatId,
    iid: message.iid
  })

  const buf = pushMessage({ reqId: data.reqId, value: pushMsg })
  if (buf) ws.send(buf)
}

const onReceiveFetchMessage = (ws: WebSocket, __data: IRequest) => {
  const fetchArgs = impb.fetchArgs.decode(__data.data.value)
  const _data = fetchMessages({ chatId: fetchArgs.chatId }) || new Uint8Array()

  const buf = pushEncode({
    reqId: __data?.reqId,
    command: impb.enum.command.FETCH_MESSAGES,
    data: { value: _data } })
  if (buf) {
    setTimeout(() => {
      ws.send(buf)
    }, 500)
  }
}

const onReceiveFetchOtherOrders = (ws: WebSocket, __data: IRequest) => {
  const props = impb.fetchOtherOrdersArgs.decode(__data.data.value)
  const _data = fetchOtherOrders(props.iid) || new Uint8Array()

  const buf = pushEncode({
    reqId: __data?.reqId,
    command: impb.enum.command.FETCH_OTHER_ORDERS,
    data: { value: _data }
  })
  if (buf) ws.send(buf)
}

const onReceiveFetchChatSetting = (ws: WebSocket, data: IRequest) => {
  sendReply(ws, data)
  const chatSetting = pushChatSetting()

  if (chatSetting) ws.send(chatSetting)
}

const onSubscribeChat = (ws: WebSocket, data: IRequest) => {
  const chatIdsWrapper = impb.chatIdsWrapper.decode(data.data.value)
  for (const id of chatIdsWrapper.chatIds) subscribed.add(id)
  sendReply(ws, data)
}

const onUnsubscribeChat = (ws: WebSocket, data: IRequest) => {
  const chatIdsWrapper = impb.chatIdsWrapper.decode(data.data.value)
  for (const id of chatIdsWrapper.chatIds) subscribed.delete(id)
  const sub = impb.chatIdsWrapper.encode({ chatIds: Array.from(subscribed) })
  sendReply(ws, { ...data, data: { value: sub } })
}

export const onMessage = (ws: WebSocket, event: RawData) => {
  try {
    const data = impb.request?.decode(event as Uint8Array)
    switch (data.command) {
      case impb.enum.command.PING: return onReceivePing(ws)
      case impb.enum.command.SEND_MESSAGE: return onReceiveSendMessage(ws, data)
      case impb.enum.command.SUBSCRIBE_CHAT: return onSubscribeChat(ws, data)
      case impb.enum.command.UNSUBSCRIBE_CHAT: return onUnsubscribeChat(ws, data)
      case impb.enum.command.FETCH_MESSAGES: return onReceiveFetchMessage(ws, data)
      case impb.enum.command.FETCH_OTHER_ORDERS: return onReceiveFetchOtherOrders(ws, data)
      case impb.enum.command.FETCH_CHAT_SETTING: return onReceiveFetchChatSetting(ws, data)
    }

  } catch (e) {
    console.debug('decode error: ', event, e)
  }
}
