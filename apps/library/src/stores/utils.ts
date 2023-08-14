import { writable as svelteWritable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'

export const writableSyncLocalStorage = <T>(key: string, init: any): Writable<T> => {
  const stored = localStorage.getItem(key)
  const def = stored || init

  const store = svelteWritable<T>(def)
  try {
    localStorage.setItem(key, def)
  } catch (e) {
    // just catch for safari private mode
  }

  return {
    subscribe: store.subscribe,
    set: (data: any) => {
      store.set(data)
      try {
        localStorage.setItem(key, data)
      } catch (e) {
        // just catch for safari private mode
      }
    },
    update: (func) => {
      store.update(func)
      try {
        localStorage.setItem(key, get(store) as any)
      } catch (e) {
        // just catch for safari private mode
      }
    }
  }
}
