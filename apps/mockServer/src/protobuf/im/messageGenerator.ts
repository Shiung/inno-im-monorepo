import impb from 'protobuf/im/node'

import { messageEntityData, pushMessageData } from '../../mock/im/chatroom'


const messageEntity = () => {
  const data = messageEntityData()
  return impb._messageEntity?.encode(data).finish()
}

export const pushMessage = (id?: string) => {
  const data = pushMessageData({ id, value: messageEntity() })
  return impb._request?.encode(data).finish()
}
