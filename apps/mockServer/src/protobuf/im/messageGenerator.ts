import impb from 'protobuf/im/node'

import { mockMessageEntity, mockOtherOrder } from '../../mock/im/chatroom'
import type { ChatSettingDataProps, MessageEntityDataProps } from '../../mock/im/chatroom'
import type { IPushMessageEntity, IPush } from 'protobuf/im/types'

type PickPartial<T, K extends keyof T> = Pick<T, Extract<keyof T, K>> & Partial<Pick<T, Exclude<keyof T, K>>> 

export const pushEncode = (props: PickPartial<IPush, 'command'>) => {
  const reqId = props.reqId || ''
  const code = props.code || 0
  const msg = props.msg || ''
  const data = props.data || { value: new Uint8Array() }

  return impb.push?.encode({
    reqId,
    command: props.command,
    code,
    msg,
    data
  })
}

export const pushMessageEntityEncode = (data: Partial<IPushMessageEntity>) => {
  return impb.pushMessageEntity?.encode(mockMessageEntity(data))
}

export const pushMessageEntityWrapperEncode = (data: IPushMessageEntity[]) => {
  return impb.pushMessageEntityWrapper?.encode({ pushMessageEntity: data })
}

export const pushChatSettingEncode = (data?: ChatSettingDataProps) => {
  return impb.chatSetting?.encode({ setting: JSON.stringify(data) })
}

let lastDateId = Date.now()

export const fetchMessages = (msg?: MessageEntityDataProps) => {
  const data = Array.from({ length: 100 }, (_, idx) => ({
    ...mockMessageEntity(msg, lastDateId - (100 - idx))
  }))

  lastDateId = data[0].msgId

  return pushMessageEntityWrapperEncode(data)
}

export const fetchOtherOrders = (props?: { iid: number }) => {
  const data = Array.from({ length: 10 }, (_) => ({
    ...mockMessageEntity({
      contentType: 2,
      content: JSON.stringify(mockOtherOrder(props?.iid || 0))
    })
  }))
  return pushMessageEntityWrapperEncode(data)
}