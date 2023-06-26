import impb from 'protobuf/im/node'

import { messageEntityData, pushMessageData } from '../../mock/im/chatroom'
import type { MessageEntityDataProps } from '../../mock/im/chatroom'


export const pushMessageEntity = (msg?: MessageEntityDataProps) => {
  const data = messageEntityData(Date.now(), msg)
  return impb.pushMessageEntity?.encode(data)
}

export const pushMessage = (props?: { reqId?: string, value?: Uint8Array | undefined }) => {
  const data = pushMessageData({ reqId: props?.reqId, value: props?.value || pushMessageEntity() })
  return impb.push?.encode(data)
}
