import { im } from 'protobuf'
import { getConfig } from 'env-config'

import createWebsocket from '../../core/wsMaster'
import {
  sendMessage,
  fetchMessages,
  subscribeChat,
  unsubscribeChat,
  reportAbuse,
  fetchOtherOrders,
  fetchChatSetting
} from './publishHandler'

import {
  sendMessageParser,
  pushMessageParser,
  fetchMessagesParser,
  subscribeChatParser,
  unsubscribeChatParser,
  fetchOtherOrdersParser,
  chatSettingParser
} from './messagePreparser'

const dev = localStorage.getItem('dev') === 'true'
const mock = localStorage.getItem('mock') === 'true'

const ws = createWebsocket({
  url: mock ? 'ws://localhost:5174/proto/IM_API_URL' : `${getConfig().IM_WS_URL}/chat-ws/ws`,
  // url: 'ws://172.28.30.117:3000/im/chat-ws/ws',
  binaryType: 'arraybuffer',
  reconnectInterval: 0.3 * 1000,

  pingPongParser: {
    ping: () => im.request.encode({ reqId: '', command: im.enum.command.PING, data: { value: new Uint8Array() } }),
    pong: (event) => event.eventkey === im.enum.command.PING
  },

  messagePreparser: (event) => {
    const decoded = im.push.decode(event.data)
    if (dev && decoded.command !== im.enum.command.PING) console.debug('ws onmessage PUSH DECODE: ', { ...decoded })

    switch (decoded?.command) {
      case im.enum.command.SEND_MESSAGE: return sendMessageParser(decoded)
      case im.enum.command.PUSH_MESSAGE: return pushMessageParser(decoded)
      case im.enum.command.FETCH_MESSAGES: return fetchMessagesParser(decoded)
      case im.enum.command.SUBSCRIBE_CHAT: return subscribeChatParser(decoded)
      case im.enum.command.UNSUBSCRIBE_CHAT: return unsubscribeChatParser(decoded)
      case im.enum.command.FETCH_OTHER_ORDERS: return fetchOtherOrdersParser(decoded)
      case im.enum.command.CHAT_SETTING: return chatSettingParser(decoded)
      default:
        return { eventkey: decoded?.command, pairId: decoded?.reqId, data: decoded?.data?.value }
    }
  },

  publishPreprocessor: (event) => {
    if (dev) console.debug('ws publish: ', { ...event })
    switch (event.eventkey) {
      case im.enum.command.SEND_MESSAGE: return sendMessage(event)
      case im.enum.command.FETCH_MESSAGES: return fetchMessages(event)
      case im.enum.command.SUBSCRIBE_CHAT: return subscribeChat(event)
      case im.enum.command.UNSUBSCRIBE_CHAT: return unsubscribeChat(event)
      case im.enum.command.REPORT_ABUSE: return reportAbuse(event)
      case im.enum.command.FETCH_OTHER_ORDERS: return fetchOtherOrders(event)
      case im.enum.command.FETCH_CHAT_SETTING: return fetchChatSetting(event)

      default: return event.data
    }
  }

})

export default ws
