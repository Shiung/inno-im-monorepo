import { createStoreContext } from '../index'

export const [setContext, getContext] = createStoreContext('test', {
  a: 1,
  b: 2
})
