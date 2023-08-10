import { writable } from 'svelte/store'

export interface IChatroomEnv {
  subscribeBindingChatroom: boolean
}

export const initEnv: IChatroomEnv = {
  subscribeBindingChatroom: true
}

export const chatEnv = writable(initEnv)
export const setChatEnv = (_env: Partial<IChatroomEnv>) => chatEnv.update((e) => ({ ...e, ..._env }))
