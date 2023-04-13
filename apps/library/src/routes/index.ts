import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import Entry from '$pages/entry.svelte'

const routes = {
  '/': Entry,
  '/square/:sid?': wrap({
    asyncComponent: () => import('$pages/square/index.svelte'),
    userData: {
      bottomNav: 'square'
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.sid) replace('/square/1')
        return true
      }
    ]
  }),
  '/anchor/:sid?': wrap({
    asyncComponent: () => import('$pages/anchor/index.svelte'),
    userData: {
      bottomNav: 'anchor'
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.sid) replace('/anchor/all')
        return true
      }
    ]
  }),
  '/uikit': wrap({
    asyncComponent: () => import('$pages/uikit/index.svelte')
  }),
  '/test': wrap({
    asyncComponent: () => import('$pages/test/index.svelte')
  }),
  '*': wrap({
    asyncComponent: () => import('$pages/NotFound.svelte')
  })
}

export default routes
