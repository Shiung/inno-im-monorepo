import impb from 'protobuf/im/node'
import { getRandomItemFromArray } from 'utils'

import { subscribed } from './store'

import { messageEntityData, pushMessageData, pushChatSettingData, chatSettingData } from '../../mock/im/chatroom'
import type { MessageEntityDataProps, ChatSettingDataProps } from '../../mock/im/chatroom'
import { genOtherOrder } from '../../mock/im/utils'

export const pushMessageEntity = (msg?: MessageEntityDataProps) => {
  const data = messageEntityData(Date.now(), msg)
  return impb.pushMessageEntity?.encode(data)
}

export const genChatSetting = (setting?: ChatSettingDataProps) => {
  const data = chatSettingData(setting)
  return impb.chatSetting?.encode({ setting: JSON.stringify(data) })
}

export const pushMessage = (props?: { reqId?: string, value?: Uint8Array | undefined }) => {
  const chatId = getRandomItemFromArray(Array.from(subscribed))
  const data = pushMessageData({ reqId: props?.reqId, value: props?.value || pushMessageEntity({ chatId }) })
  return impb.push?.encode(data)
}

export const pushChatSetting = (props?: { reqId?: string, value?: Uint8Array | undefined }) => {
  const data = pushChatSettingData({ reqId: props?.reqId, value: props?.value || genChatSetting() })
  return impb.push?.encode(data)
}

let lastDateId = Date.now()

export const genPushMessages = () => {
  const data = Array.from({ length: 10 }, (_, idx) => ({
    ...messageEntityData(lastDateId - (10 - idx))
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
