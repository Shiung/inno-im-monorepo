import { writable as svelteWritable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'

export const writableSyncLocalStorage = <T>(key: string, init: any): Writable<T> => {
  const stored = localStorage.getItem(key)
  const def = stored || init

  const store = svelteWritable<T>(def)
  localStorage.setItem(key, def)


  return {
    subscribe: store.subscribe,
    set: (data: any) => {
      store.set(data)
      localStorage.setItem(key, data)
    },
    update: (func) => {
      store.update(func)
      localStorage.setItem(key, get(store) as any)
    }
  }
}
