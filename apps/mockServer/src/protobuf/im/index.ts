import impb from 'protobuf/im/node'
import { pushMessage, pushMessageEntity, genPushMessages } from './messageGenerator'

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
  const _data = genPushMessages()

  const buf = impb.push?.encode({ reqId: '', command: impb.enum.command.FETCH_MESSAGES, code: 0, msg: '', data: { value: _data || new Uint8Array() } })
  if (buf) ws.send(buf)
}

export const onMessage = (ws: WebSocket, event: RawData) => {
  try {
    const data = impb.request?.decode(event as Uint8Array)
    switch (data.command) {
      case impb.enum.command.PING: return onReceivePing(ws)
      case impb.enum.command.SEND_MESSAGE: return onReceiveSendMessage(ws, data)
      case impb.enum.command.SUBSCRIBE_CHAT: return sendReply(ws, data)
      case impb.enum.command.UNSUBSCRIBE_CHAT: return sendReply(ws, { ...data, data: { value: new Uint8Array() } })
      case impb.enum.command.FETCH_MESSAGES: return onReceiveFetchMessage(ws, data)
    }

  } catch (e) {
    console.log('decode error: ', event, e)
  }
}
