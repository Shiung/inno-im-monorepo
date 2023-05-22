import { sendData, genChatRoomBody } from './utils'

import type { WebSocket } from 'ws'
import type { IStompData } from '../types'

let interval: ReturnType<typeof setInterval>

const chatRoomHandler = (ws: WebSocket, data: IStompData) => {
  clearInterval(interval)

  interval = setInterval(() => {
    sendData({
      ws,
      data,
      body: genChatRoomBody()
    })
  }, 1000)
}

export default (ws: WebSocket, data: IStompData) => {
  const { headers } = data

  if (headers.destination.match('/topic/chat-room')) return chatRoomHandler(ws, data)

  return ws.send('\n')
}
