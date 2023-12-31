import { WebSocketServer } from 'ws'
import {
  onConnection as onImConnection,
  onClose as onImClose,
  onMessage as onImMessage
} from './im'

export const createProtoSocketServer = () => {
  const wss = new WebSocketServer({ noServer: true })

  wss.on('connection', (ws, req) => {
    const urlParser = new URL(req?.url || '', 'http://localhost:5174')
    const module = urlParser?.pathname?.split('/proto/')?.[1]

    switch (module) {
      case 'IM_API_URL':
        onImConnection(ws); break
      default:
        break
    }

    ws.on('close', () => {
      switch (module) {
        case 'IM_API_URL':
          onImClose(); break
        default:
          break
      }
    })

    ws.on('message', (event) => {
      switch (module) {
        case 'IM_API_URL':
          onImMessage(ws, event); break
        default:
          break
      }
    })
  })

  return wss
}
