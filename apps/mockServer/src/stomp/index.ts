import { WebSocketServer } from 'ws'
// import { parse } from 'url'

import { headersParse, bodyParse } from './utils'
import { connectHandler, subscribeHandler, sendHandler } from './handlers'

export const createStompSocketServer = () => {
  const wss = new WebSocketServer({ noServer: true })

  wss.on('connection', (ws, req) => {
    ws.on('message', (event) => {
      const [type, ...data] = event.toString().split(/\r?\n/)
      const headers = headersParse(data)
      const body = bodyParse(data)
      const stompData = { headers, body }

      switch (type) {
        case 'CONNECT': return connectHandler(ws, stompData)
        case 'SUBSCRIBE': return subscribeHandler(ws, stompData, req.url)
        case 'SEND': return sendHandler(ws, stompData, req.url)
        // case 'MESSAGE': return messageHandler(ws, stompData)
      }
    })
  })

  return wss
}
