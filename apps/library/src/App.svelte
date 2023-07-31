<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Router, { location, replace } from 'svelte-spa-router'
  import BottomNavigation from '$containers/BottomNavigation'
  import { bottomNav, showBottomNav, appHeight } from '$stores/layout'
  import { throttle } from 'utils'
  import { getTimeDifference } from 'utils/convertDateAndTimestamp'
  import routes from './routes'
  import BigNumber from 'bignumber.js'
  import versionInfo from './utils/versionInfo'
  import { im } from 'api'
  import { fetchUserKeyInfo } from '$api/index'
  import { goHomeCallback, fetchLangInfo, userAuth, userVipList, diffTime } from '$stores'
  import { CODE_STATUS_OK } from '$src/constant'

  versionInfo()
  $: console.log('=========[im-library] location==========', $location)

  const routeLoading = (event: CustomEvent) => {
    bottomNav.set(event?.detail?.userData?.bottomNav)

    if (event?.detail?.userData?.showBottomNav === false) showBottomNav.set(false)
    else showBottomNav.set(true)
  }

  const conditionsFailed = (event: CustomEvent) => {
    if (event?.detail?.userData?.isExpertRelevant) replace('/expert/0')
  }

  const setVh = () => {
    const vh = new BigNumber(window.innerHeight * 0.01).toFixed(2)
    document.body.style.setProperty('--vh', `${vh}px`)
    appHeight.set(Number(vh))
  }

  const handleResize = throttle(setVh, 250)

  const fetchUserVipList = async (token: string) => {
    if (!token) return

    try {
      const res = await im.userVipList()
      const { code, data, serverTime } = res || {}

      if (code === CODE_STATUS_OK) userVipList.set(data?.list || [])

      if (serverTime) diffTime.set(getTimeDifference(serverTime))
    } catch (error) {
      console.error(error)
    }
  }

  $: {
    fetchUserVipList($userAuth.userToken)
    fetchUserKeyInfo($userAuth.userToken)
  }

  onMount(() => {
    setVh()
    fetchLangInfo()
    window.addEventListener('resize', handleResize)
  })

  onDestroy(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<main class="im-library">
  <Router {routes} on:conditionsFailed={conditionsFailed} on:routeLoading={routeLoading} />
  {#if $showBottomNav}
    <BottomNavigation goHome={() => $goHomeCallback()} />
  {/if}
</main>
