import { getContext, setContext} from 'svelte'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export type CreateStoreContextReturn<T> = [
  (props?: T) => {[k in keyof T]: Writable<T[k]>},
  () => ReturnType<typeof getContext<{[k in keyof T]: Writable<T[k]>}>>
]

export const createStoreContext = <T extends Object>(key: string | symbol, props: T): CreateStoreContextReturn<T> => {

  const context = Object.fromEntries(
    Object.entries(props).map(([k, v]) => [k, writable(v)])
  ) as {[k in keyof T]: Writable<T[k]>}


  const set = (_props?: Partial<T>) => {
    for (const [_key, _val] of Object.entries(_props || {})) {
      if (context[_key as keyof T]) context[_key as keyof T].set(_val)
    }

    setContext(key, context)
    return context
  }


  return [(_props?: T) => set(_props), () => getContext(key)]
}
