import { WebSocketServer } from 'ws'

export const createEchoSocketServer = () => {
  const wss = new WebSocketServer({ noServer: true })

  wss.on('connection', (ws, _req) => {
    ws.on('message', (event) => {
      ws.send(event)
    })
  })

  return wss
}
