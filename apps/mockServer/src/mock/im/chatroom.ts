import { mock, Random } from 'mockjs'
import { prefix, withData, genSelfOrder } from './utils'

import { ECommand } from 'protobuf/im/constants'
import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

export interface MessageEntityDataProps {
  content?: string
  contentType?: number
  sender?: string
  isSelf?: boolean
  chatId?: string
  iid?: number
}

export const messageEntityData = (ts: number = Date.now(), props?: MessageEntityDataProps) => {
  const _content = props?.content
  const _sender = props?.sender
  const _contentType = props?.contentType

  return mock({
    msgId: ts,
    contentType: _contentType || 1,
    vdId: 4,
    senderName: _sender || '@name',
    isSelf: !!props?.isSelf,
    chatId: props?.chatId || '@guid',
    iid: props?.iid || Random.integer(0, 999999),
    vip: Random.integer(0, 12),
    avatar: String(Random.integer(0, 100)),
    replyTo: Random.integer(0, 100000),
    content: _content || '@sentence',
    visible: Random.integer(0, 2),
    timestamp: ts,
    ...(props?.chatId && { houseId: props?.chatId }),
    lang: Random.pick([
      'zh_CN',
      'zh_HK',
      'en_US',
      'ms_MY',
      'id_ID',
      'vi_VN',
      'hi_IN',
      'ja_JP',
      'ko_KR',
      'th_TH',
      'pt_PT'
    ])
  })
}

export const pushMessageData = (props: { reqId?: string, value?: Uint8Array }) => {
  const reqId = props.reqId
  const value = props.value || new Uint8Array()

  return {
    ...(reqId && { reqId }),
    command: ECommand.PUSH_MESSAGE,
    code: 0,
    msg: '',
    data: { value }
  }
}
