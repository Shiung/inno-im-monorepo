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
const subscribeSet = new Set<string>()

const MAX_MESSAGES_LIMIT = 500
const SLICE_SIZE = 200

type IdInfo = { chatId: string, iid: number }

export const genId = ({ chatId, iid }: IdInfo) => chatId || String(iid)

const getStore = (props: IdInfo) => {
  const id = genId(props)
  if (id === '0') return writable([]) // 0 用來當空聊天室

  const store = messageMap.get(id)
  if (store) return store

  const _store = writable([])
  messageMap.set(id, _store)
  return _store
}

export const getMessages = (props: IdInfo) => getStore(props)

export const rmvPrevMsgsWhenOverLimit = (props: IdInfo) => {
  const messages = getStore(props)

  while (get(messages).length > MAX_MESSAGES_LIMIT) messages.update(e => e.slice(SLICE_SIZE))
}

const subscribePushMessage = () => imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
  const store = getStore({ chatId: data.chatId, iid: data.iid })
  store.update((msg) => [...msg, data])
})

const fetchHistory = async (id: string, store: Writable<IChatMessage[]>) => {
  const res = await imWs.publish({
    eventkey: impb.enum.command.FETCH_MESSAGES,
    data: { pointer: 0, chatId: id }
  })

  // sort msgId ascending order
  res.data.pushMessageEntity.sort((a: any, b: any) => a.msgId - b.msgId)

  store.update((messages) => {
    const set = new Set()
    // 去除重複msgId避免掛掉
    const result = [...res.data.pushMessageEntity, ...messages].filter(item => !set.has(item.msgId) ? set.add(item.msgId) : false)
    return result
  })
}

const checkIfNeedFetchHistory = async (props: IdInfo) => {
  const store = getStore(props)
  const id = genId(props)
  if (get(store).length !== 0) return

  fetchHistory(id, store)
}

export const subscribeRoom = async (props: IdInfo) => {
  const id = genId(props)
  subscribeSet.add(id)

  if (imWs.socket.current?.readyState !== WebSocket.OPEN) return

  await imWs.publish({
    eventkey: impb.enum.command.SUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })

  checkIfNeedFetchHistory(props)
}

export const unsubscribeRoom = async (props: IdInfo) => {
  const id = genId(props)
  if (id === '0') return

  await imWs.publish({
    eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })

  subscribeSet.delete(id)
  const store = getStore(props)
  store.set([])
  messageMap.delete(id)
}

const clearAllStores = () => {
  messageMap.forEach((store) => store.set([]))
}

const imWsConnect = (e: IUserInfo) => {
  imWs.setParams({
    account: e.userAccount,
    vd: getConfig().vendor_id,
    lang: get(locale),
    referer: refererTools.getBase64()
  })
  imWs.setSubprotocols(e.userToken)

  clearAllStores()
  // 先用 reconnect 的方式，因為平台在給 userInfo 後可能 ws 都還沒有連上
  // if (imWs.enabled) imWs.reconnect()
  // else imWs.activate()
  imWs.reconnect()
}

const checkAllStoreIfNeedFetchHistory = () => {
  Array.from(subscribeSet, (id) => {
    const store = messageMap.get(id)
    if (!store) return

    fetchHistory(id, store)
  })
}

const subscribeRooms = () => {
  if (subscribeSet.size === 0) return

  imWs.publish({
    eventkey: impb.enum.command.SUBSCRIBE_CHAT,
    data: { chatIds: Array.from(subscribeSet) }
  })

  checkAllStoreIfNeedFetchHistory()
}

let unSubUserInfo: ReturnType<typeof userInfo.subscribe>

let pushMessageSub: ReturnType<typeof imWs.subscribe>
export const active = () => {
  unSubUserInfo = userInfo.subscribe(imWsConnect)
  pushMessageSub = subscribePushMessage()
  imWs.register(subscribeRooms)
}

export const destroy = () => {
  unSubUserInfo()
  if (pushMessageSub) pushMessageSub.unsubscribe()

  clearAllStores()
  subscribeSet.clear()
  imWs.deactivate()
}
