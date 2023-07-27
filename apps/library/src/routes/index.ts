import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
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
  '/anchorChat/:anchorHouseId?': wrap({
    asyncComponent: () => import('$pages/anchorChat/index.svelte'),
    userData: {
      showBottomNav: false
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.anchorHouseId) replace('/anchor/0')
        return true
      }
    ]
  }),
  // '/expert/:expertSid?': wrap({
  //   asyncComponent: () => import('$pages/expert/index.svelte'),
  //   userData: {
  //     bottomNav: 'expert'
  //   },
  //   conditions: [
  //     (detail) => {
  //       if (!detail?.params?.expertSid) replace('/expert/0')
  //       return true
  //     }
  //   ]
  // }),
  // '/expertDetail/:expertId/:method?': wrap({
  //   asyncComponent: () => import('$pages/expertDetail/index.svelte'),
  //   userData: {
  //     showBottomNav: false
  //   },
  //   conditions: [
  //     (detail) => {
  //       const { expertId, method } = detail?.params || {}
  //       if (!method) replace(`/expertDetail/${expertId}/plan`)
  //       return true
  //     }
  //   ]
  // }),
  // '/planDetail/:expertId/:articleId': wrap({
  //   asyncComponent: () => import('$pages/planDetail/index.svelte'),
  //   userData: {
  //     showBottomNav: false
  //   },
  //   conditions: [
  //     () => {
  //       window.scrollTo(0, 0)
  //       return true
  //     }
  //   ]
  // }),
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
  '/test/anchorChat/:anchorHouseId?': wrap({
    asyncComponent: () => import('../pages/test/anchorChat/index.svelte'),
    userData: {
      showBottomNav: false
    },
    conditions: [
      (detail) => {
        if (!detail?.params?.anchorHouseId) replace('/test/anchors')
        return true
      }
    ]
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
