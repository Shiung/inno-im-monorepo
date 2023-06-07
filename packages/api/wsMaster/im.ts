import { im } from 'protobuf'

import createWebsocket from '../core/wsMaster'

const ws = createWebsocket({
  url: 'ws://localhost:5174/proto/IM_API_URL',
  binaryType: 'arraybuffer',
  pingPongCommand: { ping: 'ping', pong: 'pong' },

  eventkeyParser: (event) => {
    const decoded = im.push.decode(event.data)

    switch (decoded.command) {
      case im.enum.command.PUSH_MESSAGE:
        const pushMessageEntity = im.pushMessageEntity.decode(decoded.data.value)
        console.log(pushMessageEntity)
        return { eventkey: decoded.command, data: pushMessageEntity }

      default:
        return { eventkey: decoded.command, data: decoded.data.value }
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

        return im.request.encode({
          reqId: '123',
          command: im.enum.command.SEND_MESSAGE,
          data: {
            value: requestMessageEntity || new ArrayBuffer(0)
          }
        })

      default: return event.data
    }
  }

})

export default ws
