import { messageEntityData } from '../../mock/im/chatroom'

import type { WebSocket } from 'ws'
import type { IHeaders, IStompData } from '../types'

export const genHeaders = (headers: IHeaders, length: number) => ({
  timestamp: Date.now(),
  // pod: 'inno-console-ws-java-backend-vd000-pf000-dev-68d6848447-jknkn',
  destination: headers.destination,
  'content-type': 'application/json',
  subscription: headers.id,
  // 'message-id': '295fae9a-01e0-d2b0-3168-046430bca58a-242455',
  'content-length': length,
})

const stringifyHeaders = (headers: IHeaders, length: number) => {
  return Object.entries(genHeaders(headers, length))
    .map(([key, value]) => `${key}:${value}\n`)
    .join('')
}

export const genChatRoomBody = (props?: { message?: string, userId?: string }) => {
  const _message = props?.message
  const _userId = props?.userId

  return messageEntityData(0, { content: _message, sender: _userId })
}

export const sendData = (props: { ws: WebSocket, data: IStompData, body: object }) => {
  const { ws, data, body } = props
  const stringBody = JSON.stringify(body)
  const length = Buffer.byteLength(stringBody, 'utf8')

  ws.send([
    'MESSAGE\n',
    stringifyHeaders(data.headers, length),
    '\n',
    stringBody,
    '\x00'
  ].join(''))
}
