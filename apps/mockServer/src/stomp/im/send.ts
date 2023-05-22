import { sendData, genChatRoomBody } from './utils'

import type { WebSocket } from 'ws'
import type { IStompData } from '../types'

const chatRoomHandler = (ws: WebSocket, data: IStompData) => {
  const body = data.body.replace('\x00', '')
  const { message, userId } = JSON.parse(body)

  sendData({
    ws,
    data,
    body: genChatRoomBody({message, userId})
  })
}

export default (ws: WebSocket, data: IStompData) => {
  const { headers } = data

  if (headers.destination.match('/topic/chat-room')) return chatRoomHandler(ws, data)

  return ws.send('\n')
}