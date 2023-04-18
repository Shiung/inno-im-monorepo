import { writable } from 'svelte/store'
import { SID } from 'utils'

const createSid = () => {
  const { subscribe, set, update } = writable<SID>(SID.all)

  return {
    subscribe,
    set,
    update,
    reset: () => set(SID.all)
  }
}

export const sid = createSid()
