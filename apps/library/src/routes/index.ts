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
  '/anchor/:anchorSid?': wrap({
    asyncComponent: () => import('$pages/anchor/index.svelte'),
    userData: {
      bottomNav: 'anchor'
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.anchorSid) replace('/anchor/0')
        return true
      }
    ]
  }),
  '/platformExpert/:sid?': wrap({
    asyncComponent: () => import('$pages/platformExpert/index.svelte'),
    userData: {
      showBottomNav: false
    }
  }),
  '*': wrap({
    asyncComponent: () => import('$pages/NotFound.svelte')
  })
}

export default routes
