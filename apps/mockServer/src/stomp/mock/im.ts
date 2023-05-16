import { mock, Random } from 'mockjs'
import { sendData } from './utils'

import type { WebSocket } from 'ws'
import type { IChatRoom } from 'api/im/types'
import type { IStompData } from '../types'

const genChatRoomBody = () => mock({
  type: "message",
  blackList: false,
  source: "@name",
  sourceInfo: {
    nickName: "@name",
    vip: Random.integer(0, 12),
    avatar: Random.integer(0, 100),
    sportAccount: "@name",
    accountType: Random.integer(0, 1), 
    enabledTitle: Random.integer(0, 3)
  },
  language: "zh_HK",
  data: {
    message: "@sentence",
    reply: null
  }
} as IChatRoom)

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
