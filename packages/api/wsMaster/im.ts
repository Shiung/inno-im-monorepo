import { im } from 'protobuf'

import createWebsocket from '../core/wsMaster'

const ws = createWebsocket({
  url: 'ws://localhost:5174/proto/IM_API_URL',
  // url: 'ws://172.28.40.55:5174/proto/IM_API_URL',
  binaryType: 'arraybuffer',

  pingPongParser: {
    ping: () => im.request.encode({ reqId: '', command: im.enum.command.PING, data: { value: new Uint8Array() } }),
    pong: (event) => event.eventkey === im.enum.command.PING
  },

  messagePreparser: (event) => {
    const decoded = im.push.decode(event.data)

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
    switch (event.eventkey) {
      case im.enum.command.SEND_MESSAGE:
        const requestMessageEntity = im.requestMessageEntity.encode({
          contentType: im.enum.contentType.CHAT,
          chatId: event.data.chatId,
          iid: event.data.iid,
          replyTo: event.data.replyTo,
          content: event.data.content
        })

        const request = im.request.encode({
          reqId: String(event?.pairId || ''),
          command: im.enum.command.SEND_MESSAGE,
          data: {
            value: requestMessageEntity || new ArrayBuffer(0)
          }
        })

        return request

      default: return event.data
    }
  }

})

export default ws
