import type { WebSocket } from 'ws'
import type { IStompData } from './types'

import { subscribe, send } from './handlerDict'

let heartBeat: NodeJS.Timer

export const connectHandler = (ws: WebSocket, _data: IStompData) => {
  clearInterval(heartBeat)
  ws.send(`CONNECTED\nversion:1.2\nheart-beat:10000,20000\n\n\x00`)
  heartBeat = setInterval(() => {
    ws.send('\n')
  }, 9000)
}

  
export const subscribeHandler = (ws: WebSocket, data: IStompData, url?: string) => {
  if (!url) return ws.send('no url.')

  const handler = subscribe.get(url.replace('/stomp/', ''))
  if (!handler) return ws.send('no such handler.')
  return handler(ws, data)
}

export const sendHandler = (ws: WebSocket, data: IStompData, url?: string) => {
    if (!url) return ws.send('no url.')

  const handler = send.get(url.replace('/stomp/', ''))
  if (!handler) return ws.send('no such handler.')
  return handler(ws, data)
}

export const messageHandler = ((ws: WebSocket, data: IStompData) => {
  ws.send(JSON.stringify(data))
})


