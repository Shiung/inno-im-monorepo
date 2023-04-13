import { wrap } from 'svelte-spa-router/wrap'
import Entry from '$pages/entry.svelte'

const routes = {
  '/': Entry,
  '/square/:sid': wrap({
    asyncComponent: () => import('$pages/square/index.svelte'),
    userData: {
      bottomNav: 'square'
    }
  }),
  '/uikit': wrap({
    asyncComponent: () => import('$pages/uikit/index.svelte')
  }),
  '/test': wrap({
    asyncComponent: () => import('$pages/test/index.svelte')
  })
}

export default routes
