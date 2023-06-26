import { im } from 'protobuf'

import createWebsocket from '../../core/wsMaster'
import {
  sendMessage,
  fetchMessages,
  subscribeChat,
  unsubscribeChat,
  reportAbuse
} from './publishHandler'


const dev = localStorage.getItem('dev') === 'true'

const ws = createWebsocket({
  // url: 'ws://localhost:5174/proto/IM_API_URL',
  // url: 'ws://172.28.40.55:5174/proto/IM_API_URL',
  url: 'ws://localhost:3000/im/chat-ws/ws',
  // url: 'ws://172.28.30.209:3000/im/chat-ws/ws',
  binaryType: 'arraybuffer',

  // pingPongParser: {
  //   ping: () => im.request.encode({ reqId: '', command: im.enum.command.PING, data: { value: new Uint8Array() } }),
  //   pong: (event) => event.eventkey === im.enum.command.PING
  // },

  messagePreparser: (event) => {
    const decoded = im.push.decode(event.data)
    if (dev) console.log('ws onmessage: ', { ...decoded })

    switch (decoded.command) {
      case im.enum.command.SEND_MESSAGE:
        return { eventkey: decoded.command, pairId: decoded.reqId, code: decoded.code, msg: decoded.msg, data: decoded.data }
      case im.enum.command.PUSH_MESSAGE:
        const pushMessageEntity = im.pushMessageEntity.decode(decoded.data?.value)
        return { eventkey: decoded.command, pairId: decoded.reqId, data: pushMessageEntity }

      default:
        return { eventkey: decoded.command, pairId: decoded.reqId, data: decoded.data?.value }
    }
  },

  publishPreprocessor: (event) => {
    if (dev) console.log('ws publish: ', { ...event })
    switch (event.eventkey) {
      case im.enum.command.SEND_MESSAGE: return sendMessage(event)
      case im.enum.command.FETCH_MESSAGES: return fetchMessages(event)
      case im.enum.command.SUBSCRIBE_CHAT: return subscribeChat(event)
      case im.enum.command.UNSUBSCRIBE_CHAT: return unsubscribeChat(event)
      case im.enum.command.REPORT_ABUSE: return reportAbuse(event)

      default: return event.data
    }
  }

})

export default ws
