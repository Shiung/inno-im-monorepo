import impb from 'protobuf/im/node'
import { getRandomItemFromArray } from 'utils'

import { subscribed } from './store'

import { messageEntityData, pushMessageData } from '../../mock/im/chatroom'
import type { MessageEntityDataProps } from '../../mock/im/chatroom'
import { genOtherOrder } from '../../mock/im/utils'

export const pushMessageEntity = (msg?: MessageEntityDataProps) => {
  const data = messageEntityData(Date.now(), msg)
  return impb.pushMessageEntity?.encode(data)
}

export const pushMessage = (props?: { reqId?: string, value?: Uint8Array | undefined }) => {
  const chatId = getRandomItemFromArray(Array.from(subscribed))
  const data = pushMessageData({ reqId: props?.reqId, value: props?.value || pushMessageEntity({ chatId }) })
  return impb.push?.encode(data)
}

let lastDateId = Date.now()

export const genPushMessages = (msg?: MessageEntityDataProps) => {
  const data = Array.from({ length: 100 }, (_, idx) => ({
    ...messageEntityData(lastDateId - (10 - idx), msg)
  }))

  lastDateId = data[0].msgId

  return impb.pushMessageEntityWrapper?.encode({ pushMessageEntity: data })
}

export const genFetchOtherOrdersMessages = (props?: { iid: number }) => {
  const data = Array.from({ length: 10 }, (_) => ({
    ...messageEntityData(Date.now(), {
      contentType: 2,
      content: JSON.stringify(genOtherOrder(props?.iid || 0))
    })
  }))
  return impb.pushMessageEntityWrapper?.encode({ pushMessageEntity: data })
}