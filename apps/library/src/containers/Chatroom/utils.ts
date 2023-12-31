import type { IChatMessage } from 'api/im/types'
import { im } from 'protobuf'
import type { IPushMessageEntity } from 'protobuf/im/types'

const isMsgVisible = (msg: IChatMessage) => msg.isSelf || msg.visible === im.enum.visible.ALL

export const filterVisibleMsgs = (messages: IChatMessage[], idx?: number) => messages.slice(idx).filter(isMsgVisible)

export const filterDuplicatesByMsgId = (messages: IChatMessage[], newMessages: IChatMessage[]) => {
  const set = new Set()
  // 去除重複msgId避免掛掉
  const result = [...newMessages, ...messages].filter(item => !set.has(item.msgId) ? set.add(item.msgId) : false)
  return result
}

export const sortMsgsByMsgIdAsc = (data: IChatMessage[]) => {
  // sort msgId ascending order
  return data.sort((a, b) => a.msgId - b.msgId)
}

export const getOldestMsg = (messages: IChatMessage[]) => (messages?.[0] || {}) as IPushMessageEntity

export const getLatestVisibleMsg = (messages: IChatMessage[]) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    const chatMsg = messages[i]
    if (isMsgVisible(chatMsg)) return chatMsg
  }
  return {} as IPushMessageEntity
}

export const hasVisibleMsg = (messages: IChatMessage[]) => messages.findIndex(isMsgVisible) !== -1