import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import { userAuth } from '$stores'
import { get } from 'svelte/store'
// import Entry from '$pages/entry.svelte'

const routes = {
  '/': wrap({
    asyncComponent: () => null,
    conditions: [
      () => {
        replace('/square')
        return true
      }
    ]
  }),
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
      showBottomNav: false,
      isExpertRelevant: true
    },
    conditions: [
      (detail) => {
        if (!get(userAuth).userToken) return false

        const { expertId, method } = detail?.params || {}
        if (!method) replace(`/expertDetail/${expertId}/plan`)
        return true
      }
    ]
  }),
  '/planDetail/:expertId/:articleId': wrap({
    asyncComponent: () => import('$pages/planDetail/index.svelte'),
    userData: {
      showBottomNav: false,
      isExpertRelevant: true
    },
    conditions: [
      () => {
        if (!get(userAuth).userToken) return false

        window.scrollTo(0, 0)
        return true
      }
    ]
  }),
  '/test/chatroom': wrap({
    asyncComponent: () => import('../pages/test/chatroom/index.svelte'),
    userData: {
      showBottomNav: false
    },
  }),
  '/test/anchors': wrap({
    asyncComponent: () => import('../pages/test/anchors/index.svelte'),
    userData: {
      showBottomNav: false
    }
  }),
  '/test/expert': wrap({
    asyncComponent: () => import('../pages/test/expert/index.svelte'),
    userData: {
      showBottomNav: false
    }
  }),
  '*': wrap({
    asyncComponent: () => import('$pages/NotFound.svelte')
  })
}

export default routes
