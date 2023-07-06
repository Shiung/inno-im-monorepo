import { im } from 'protobuf'
import type { IPush } from 'protobuf/im/types'

const dev = localStorage.getItem('dev') === 'true'

export const sendMessageParser = (decoded: IPush) => {
  if (dev) console.log('ws onmessage SEND_MESSAGE: ', { ...decoded })
  return { eventkey: decoded.command, pairId: decoded.reqId, code: decoded.code, msg: decoded.msg, data: decoded.data }
}

export const pushMessageParser = (decoded: IPush) => {
  const pushMessageEntity = im.pushMessageEntity.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: pushMessageEntity }
  if (dev) console.log('ws onmessage PUSH_MESSAGE: ', data)

  return data
}

export const fetchMessagesParser = (decoded: IPush) => {
  const messages = im.pushMessageEntityWrapper.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: messages }
  if (dev) console.log('ws onmessage FETCH_MESSAGES: ', data)

  return data
}

export const subscribeChatParser = (decoded: IPush) => {
  const message = im.chatIdsWrapper.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: message }
  if (dev) console.log('ws onmessage SUBSCRIBE_MESSAGES: ', data)

  return data
}

export const unsubscribeChatParser = (decoded: IPush) => {
  const message = im.chatIdsWrapper.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: message }
  if (dev) console.log('ws onmessage UNSUBSCRIBE_MESSAGES: ', data)

  return data
}

export const fetchOtherOrdersParser = (decoded: IPush) => {
  const messages = im.pushMessageEntityWrapper.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: messages }
  if (dev) console.log('ws onmessage FETCH_OTHER_ORDERS: ', data)

  return data
}

export const chatSettingParser = (decoded: IPush) => {
  const chatSetting = im.ChatSetting.decode(decoded.data?.value)
  const data = { eventkey: decoded.command, pairId: decoded.reqId, data: chatSetting }
  if (dev) console.log('ws onmessage CHAT_SETTING: ', data)

  return data
}