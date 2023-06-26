import impb from 'protobuf/im/node'
import { pushMessage, pushMessageEntity } from './messageGenerator'

import type { IRequest } from 'protobuf/im/types'
import type { RawData, WebSocket } from 'ws'


let sendInterval: NodeJS.Timer

export const onConnection = (ws: WebSocket) => {
  if (!impb.done) {
    setTimeout(() => onConnection(ws), 100)
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
  const buffer = impb.push?.encode({ reqId: '', command: impb.enum.command.PING, code: 0, msg: '', data: { value: new Uint8Array() } })
  if (buffer) ws.send(buffer)
}

const sendReply = (ws: WebSocket, data: IRequest) => {
  const buffer = impb.push?.encode({ reqId: data.reqId, command: data.command, code: 0, msg: '', data: { value: new Uint8Array() } })
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

  const buf = pushMessage({ reqId: '', value: pushMsg })
  if (buf) ws.send(buf)
}

export const onMessage = (ws: WebSocket, event: RawData) => {

  try {
    const data = impb.request?.decode(event as Uint8Array)
    switch (data.command) {
      case impb.enum.command.PING: return onReceivePing(ws)
      case impb.enum.command.SEND_MESSAGE: return onReceiveSendMessage(ws, data)
    }

  } catch (e) {
    console.log('decode error: ', event)
  }


}
