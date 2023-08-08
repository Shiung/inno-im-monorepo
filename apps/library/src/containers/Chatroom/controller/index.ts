import { writable, get } from 'svelte/store'
import { getConfig } from 'env-config'
import { refererTools } from 'utils'
import { im as impb } from 'protobuf'
import { im as imWs } from 'api/wsMaster'

import { locale } from '$stores'

import { userAuth, type IUserAuth} from '$stores'

import type { IChatMessage } from 'api/im/types'
import type { Writable } from 'svelte/store'
import { setChatroomSetting } from './localEnv'
import { filterDuplicatesByMsgId, sortMsgsByMsgIdAsc } from '../utils'
export * from './env'

const hasVisibleMsgMap = new Map<string, Writable<boolean>>()
const messageMap = new Map<string, Writable<IChatMessage[]>>()
const subscribeSet = new Set<string>()

let pollingChatSettingTimer: ReturnType<typeof setInterval>
const pollingChatSettingInterval = 10 * 1000

let unSubUserInfo: ReturnType<typeof userAuth.subscribe>

let pushMessageSub: ReturnType<typeof imWs.subscribe>

let chatSettingSub: ReturnType<typeof imWs.subscribe>

let isActive = false

export const genId = ({ chatId, iid }: { chatId: string, iid: number }) => chatId || String(iid)

const getStore = (props: { chatId: string, iid: number }) => {
  const id = genId(props)
  if (id === '0') return writable([]) // 0 用來當空聊天室

  const store = messageMap.get(id)
  if (store) return store

  const _store = writable([])
  messageMap.set(id, _store)
  return _store
}

const getHasVisibleMsgsStore = (props: { chatId: string, iid: number }) => {
  const id = genId(props)
  if (id === '0') return writable(false) // 0 用來當空聊天室

  const store = hasVisibleMsgMap.get(id)
  if (store) return store

  const _store = writable(false)
  hasVisibleMsgMap.set(id, _store)
  return _store
}

export const getMessages = (props: { chatId: string, iid: number }) => getStore(props)

export const getHasVisibleMsgs = (props: { chatId: string, iid: number }) => getHasVisibleMsgsStore(props)

const subscribePushMessage = () => imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
  const store = getStore({ chatId: data.chatId, iid: data.iid })
  store.update((msg) => [...msg, data])
})

const subscribeChatSetting = () => imWs.subscribe({ eventkey: impb.enum.command.CHAT_SETTING }, ({ data, code }) => {
  let parsed
  try {
    parsed = JSON.parse(data?.setting)
  } catch (e) {
    console.error(e)
  }

  setChatroomSetting({ ...(parsed && { ...parsed }), errorCode: code })
})

const pollingChatSetting = () => {
  if (pollingChatSettingTimer) clearTimeout(pollingChatSettingTimer)

  pollingChatSettingTimer = setTimeout(() => {
    imWs.publish({ eventkey: impb.enum.command.FETCH_CHAT_SETTING })

    pollingChatSetting()
  }, pollingChatSettingInterval)
}

const fetchHistory = async (id: string, store: Writable<IChatMessage[]>) => {
  const res = await imWs.publish({
    eventkey: impb.enum.command.FETCH_MESSAGES,
    pairId: id,
    data: { pointer: 0, chatId: id }
  })

  // sort msgId ascending order
  res.data.pushMessageEntity.sort((a: any, b: any) => a.msgId - b.msgId)
  store.update((messages) => filterDuplicatesByMsgId(
    messages,
    sortMsgsByMsgIdAsc(res.data.pushMessageEntity)
  ))
}

const checkIfNeedFetchHistory = async (props: { chatId: string, iid: number }) => {
  const store = getStore(props)
  const id = genId(props)
  if (get(store).length !== 0) return

  fetchHistory(id, store)
}

export const subscribeRoom = async (props: { chatId: string, iid: number }) => {
  const id = genId(props)
  if (id === '0') return
  
  subscribeSet.add(id)

  if (imWs.socket.current?.readyState !== WebSocket.OPEN) return

  await imWs.publish({
    eventkey: impb.enum.command.SUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })

  checkIfNeedFetchHistory(props)
}

export const unsubscribeRoom = async (props: { chatId: string, iid: number }) => {
  const id = genId(props)
  if (id === '0') return

  await imWs.publish({
    eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
    data: { chatIds: [id] }
  })

  subscribeSet.delete(id)
  const store = getStore(props)
  const hasVisibleStore = getHasVisibleMsgsStore(props)
  store.set([])
  hasVisibleStore.set(false)
  messageMap.delete(id)
  hasVisibleMsgMap.delete(id)
}

const clearAllStores = () => {
  messageMap.forEach((store) => store.set([]))
  hasVisibleMsgMap.forEach(store => store.set(false))
}

const imWsConnect = (e: IUserAuth) => {
  imWs.setParams({
    account: e.userAccount,
    vd: getConfig().vendor_id,
    lang: get(locale),
    referer: refererTools.getBase64()
  })
  imWs.setSubprotocols(e.userToken)

  clearAllStores()
  if (pollingChatSettingTimer) clearTimeout(pollingChatSettingTimer)
  // 先用 reconnect 的方式，因為平台在給 userAuth 後可能 ws 都還沒有連上
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

export const active = () => {
  if (isActive) return

  isActive = true
  unSubUserInfo = userAuth.subscribe(imWsConnect)
  pushMessageSub = subscribePushMessage()
  chatSettingSub = subscribeChatSetting()
  imWs.register(() => {
    subscribeRooms()
    pollingChatSetting()
  })
}

export const destroy = () => {
  unSubUserInfo()
  if (pushMessageSub) pushMessageSub.unsubscribe()
  if (chatSettingSub) chatSettingSub.unsubscribe()
  if (pollingChatSettingTimer) clearTimeout(pollingChatSettingTimer)

  clearAllStores()
  subscribeSet.clear()
  messageMap.clear()
  hasVisibleMsgMap.clear()
  imWs.deactivate()

  isActive = false
}
