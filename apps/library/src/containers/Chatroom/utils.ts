import type { IChatMessage } from 'api/im/types'
import { im } from 'protobuf'

export const filterVisibleMsgs = (msgs: IChatMessage[], idx?: number) => {
  return msgs.slice(idx).filter(msg => msg.isSelf || msg.visible === im.enum.visible.ALL)
}

export const filterDuplicatesByMsgId = (messages: IChatMessage[], newMessages: IChatMessage[]) => {
  const set = new Set()
  // 去除重複msgId避免掛掉
  const result = [...newMessages, ...messages].filter(item => !set.has(item.msgId) ? set.add(item.msgId) : false)
  return result
}