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
  '/expert/:expertSid?': wrap({
    asyncComponent: () => import('$pages/expert/index.svelte'),
    userData: {
      bottomNav: 'expert'
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.expertSid) replace('/expert/0')
        return true
      }
    ]
  }),
  '/expertDetail/:expertId/:method?': wrap({
    asyncComponent: () => import('$pages/expertDetail/index.svelte'),
    userData: {
      showBottomNav: false
    },
    conditions: [
      (detail) => {
        const { expertId, method } = detail?.params || {}
        if (!method) replace(`/expertDetail/${expertId}/plan`)
        return true
      }
    ]
  }),
  '/platform/chatroom': wrap({
    asyncComponent: () => import('../pages/platformChatroom/index.svelte'),
    userData: {
      showBottomNav: false
    },
  }),
  '/platform/anchor': wrap({
    asyncComponent: () => import('../platform/anchors'),
    userData: {
      showBottomNav: false
    }
  }),
  '/platform/streaming': wrap({
    asyncComponent: () => import('../platform/streaming'),
    userData: {
      showBottomNav: false
    }
  }),
  '/platform/streamingWithAnchor': wrap({
    asyncComponent: () => import('../platform/streamingWithAnchor'),
    userData: {
      showBottomNav: false
    }
  }),
  '*': wrap({
    asyncComponent: () => import('$pages/NotFound.svelte')
  })
}

export default routes
