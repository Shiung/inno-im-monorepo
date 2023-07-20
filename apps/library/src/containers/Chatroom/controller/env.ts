import { writable } from 'svelte/store'

export interface IChatroomEnv {
  device: 'pc' | 'wap'
  subscribeBindingChatroom: boolean
}

export const initEnv: IChatroomEnv = {
  device: 'wap',
  subscribeBindingChatroom: true
}

export const chatEnv = writable(initEnv)
export const setChatEnv = (_env: Partial<IChatroomEnv>) => chatEnv.update((e) => ({ ...e, ..._env }))
