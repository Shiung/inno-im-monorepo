import { writable, get } from 'svelte/store'
import { getConfig } from 'env-config'
import { refererTools } from 'utils'
import { im as impb } from 'protobuf'
import { im as imWs } from 'api/wsMaster'

import { locale } from '$stores'

import { userInfo } from './env'

import type { IChatMessage } from 'api/im/types'
import type { IUserInfo } from './env'
import type { Writable } from 'svelte/store'

export * from './env'

const messageMap = new Map<string, Writable<IChatMessage[]>>()

const genId = ({ chatId, iid }: { chatId: string, iid: number }) => chatId || String(iid)

const getStore = (props: { chatId: string, iid: number }) => {
  const id = genId(props)
  if (id === '0') return writable([]) // 0 用來當空聊天室

  const store = messageMap.get(id)
  if (store) return store

  const _store = writable([])
  messageMap.set(id, _store)
  return _store
}

export const getMessages = (props: { chatId: string, iid: number }) => getStore(props)

const subscribePushMessage = () => imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
  const store = getStore({ chatId: data.chatId, iid: data.iid })
  store.update((msg) => [...msg, data])
})

const checkIfNeedFetchHistory = async (props: { chatId: string, iid: number }) => {
  const store = getStore(props)

  const res = await imWs.publish({
    eventkey: impb.enum.command.FETCH_MESSAGES,
    data: { pointer: 0, chatId: genId(props) }
  })

  // sort msgId ascending order
  res.data.pushMessageEntity.sort((a: any, b: any) => a.msgId - b.msgId)

  store.update((messages) => [...res.data.pushMessageEntity, ...messages])
}

export const subscribeRoom = async (props: { chatId: string, iid: number }) => {
  console.log('subscribeRoom', props)
  const id = genId(props)

  await imWs.publish({
    eventkey: impb.enum.command.SUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })

  checkIfNeedFetchHistory(props)
}

export const unsubscribeRoom = async ({ chatId, iid }: { chatId: string, iid?: number }) => {
  const id = genId({ chatId, iid })
  imWs.publish({
    eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })
}

const imWsConnect = (e: IUserInfo) => {
  imWs.setParams({
    account: e.userAccount,
    vd: getConfig().vendor_id,
    lang: get(locale),
    referer: refererTools.getBase64()
  })
  imWs.setSubprotocols(e.userToken)

  if (imWs.enabled) imWs.reconnect()
  else imWs.activate()
}

const subscribeRooms = () => {
  imWs.publish({
    eventkey: impb.enum.command.SUBSCRIBE_CHAT,
    data: { chatIds: messageMap.keys() }
  })
}

let unSubUserInfo: ReturnType<typeof userInfo.subscribe>

let pushMessageSub: ReturnType<typeof imWs.subscribe>
export const active = () => {
  console.log('active in')
  unSubUserInfo = userInfo.subscribe(imWsConnect)
  pushMessageSub = subscribePushMessage()
  imWs.register(subscribeRooms)
}

export const destory = () => {
  console.log('destory')
  unSubUserInfo()
  if (pushMessageSub) pushMessageSub.unsubscribe()
  imWs.deactivate()
}
