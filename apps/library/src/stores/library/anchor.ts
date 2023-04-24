import { writable } from 'svelte/store'
import type { SidType } from 'utils'

const createSid = () => {
  const { subscribe, set, update } = writable<SidType>(0)

  return {
    subscribe,
    set,
    update,
    reset: () => set(0)
  }
}

export const sid = createSid()
