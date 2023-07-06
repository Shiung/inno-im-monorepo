import impb from 'protobuf/im/node'
import { pushMessage, pushMessageEntity, genPushMessages, genFetchOtherOrdersMessages } from './messageGenerator'

import { subscribed } from './store'

import type { IRequest } from 'protobuf/im/types'
import type { RawData, WebSocket } from 'ws'


let sendInterval: NodeJS.Timer

export const onConnection = (ws: WebSocket) => {
  if (!impb.done) {
    setTimeout(() => onConnection(ws), 10)
    return
  }

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
  const buffer = impb.push?.encode({ ...(data.reqId && { reqId: data.reqId }), command: data.command, code: 0, msg: '', data: data.data })
  if (buffer) ws.send(buffer)
}
const onReceiveSendMessage = (ws: WebSocket, data: IRequest) => {
  sendReply(ws, data)
  const message = impb.requestMessageEntity?.decode(data.data.value as Uint8Array)

  const pushMsg = pushMessageEntity({
    content: message.content,
    contentType: message.contentType,
    sender: '',
    isSelf: true,
    chatId: message.chatId,
    iid: message.iid
  })

  const buf = pushMessage({ value: pushMsg })
  if (buf) ws.send(buf)
}

const onReceiveFetchMessage = (ws: WebSocket, __data: IRequest) => {
  const fetchArgs = impb.fetchArgs.decode(__data.data.value)
  const _data = genPushMessages({ chatId: fetchArgs.chatId })

  const buf = impb.push?.encode({ reqId: '', command: impb.enum.command.FETCH_MESSAGES, code: 0, msg: '', data: { value: _data || new Uint8Array() } })
  if (buf) {
    setTimeout(() => {
      ws.send(buf)
    }, 500)
  }
}

const onReceiveFetchOtherOrders = (ws: WebSocket, __data: IRequest) => {
  const props = impb.fetchOtherOrdersArgs.decode(__data.data.value)
  const _data = genFetchOtherOrdersMessages(props.iid)

  const buf = impb.push?.encode({ reqId: '', command: impb.enum.command.FETCH_OTHER_ORDERS, code: 0, msg: '', data: { value: _data || new Uint8Array() } })
  if (buf) ws.send(buf)
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
    }

  } catch (e) {
    console.log('decode error: ', event, e)
  }
}
