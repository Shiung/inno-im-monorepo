import { writable } from 'svelte/store'
import type { IVipList, IUserKeyInfo  } from 'api/im/types'

export const userVipList = writable<IVipList[]>()
export const userKeyInfo = writable<IUserKeyInfo['res']['data']>()