import type { WebSocket } from 'ws'
import impb from 'protobuf/im/node'

import { pushMessage } from './messageGenerator'

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
