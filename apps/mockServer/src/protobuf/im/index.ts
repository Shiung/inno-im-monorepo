import impb from 'protobuf/im/node'
import { pushMessage, pushMessageEntity } from './messageGenerator'

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

export const onMessage = (ws: WebSocket, event: RawData) => {
  const data = impb.request?.decode(event as Uint8Array)
  switch (data.command) {
    case impb.enum.command.SEND_MESSAGE:
      const message = impb.requestMessageEntity?.decode(data.data.value as Uint8Array)

      const pushMsg = pushMessageEntity({
        content: message.content,
        sender: '',
        isSelf: true,
        chatId: message.chatId,
        iid: message.iid
      })

      const buf = pushMessage({ reqId: data.reqId, value: pushMsg })
      if (buf) ws.send(buf)
      break
  }
}
