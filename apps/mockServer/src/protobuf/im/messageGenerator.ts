import impb from 'protobuf/im/node'

import { messageEntityData, pushMessageData } from '../../mock/im/chatroom'
import type { MessageEntityDataProps } from '../../mock/im/chatroom'


export const pushMessageEntity = (msg?: MessageEntityDataProps) => {
  const data = messageEntityData(0, msg)
  return impb.pushMessageEntity?.encode(data)
}

export const pushMessage = (props?: { reqId?: string, value?: Uint8Array | undefined }) => {
  const data = pushMessageData({ reqId: props?.reqId, value: props?.value || pushMessageEntity() })
  return impb.push?.encode(data)
}

export const genPushMessages = () => {
  const data = Array.from({ length: 10 }, (_, idx) => ({
    ...messageEntityData(idx)
  }))
  return impb.pushMessageEntityWrapper?.encode(data)
}
