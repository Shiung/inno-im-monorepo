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
        return { eventkey: decoded.command, data: pushMessageEntity }

      default:
        return { eventkey: decoded.command, data: decoded.data.value }
    }
  }
})

export default ws
