import { writable } from 'svelte/store'

const createUrl = () => {
  const { subscribe, set, update } = writable<string>('')

  return {
    subscribe,
    set,
    update,
    reset: () => set('')
  }
}

export const url = createUrl()
