import { wrap } from 'svelte-spa-router/wrap'
import Entry from '$pages/entry.svelte'

const routes = {
  '/': Entry,
  '/squire': wrap({
    asyncComponent: () => import('$pages/squire/index.svelte')
  }),
  '/uikit': wrap({
    asyncComponent: () => import('$pages/uikit/index.svelte')
  }),
  '/test': wrap({
    asyncComponent: () => import('$pages/test/index.svelte')
  })
}
  

export default routes
