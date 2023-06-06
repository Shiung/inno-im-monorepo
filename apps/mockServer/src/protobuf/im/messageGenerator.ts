import impb from 'protobuf/im/node'

import { messageEntityData, pushMessageData } from '../../mock/im/chatroom'


const pushMessageEntity = () => {
  const data = messageEntityData()
  return impb._pushMessageEntity?.encode(data).finish()
}

export const pushMessage = (id?: string) => {
  const data = pushMessageData({ id, value: pushMessageEntity() })
  return impb._push?.encode(data).finish()
}
