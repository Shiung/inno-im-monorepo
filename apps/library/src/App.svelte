<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Router, { location } from 'svelte-spa-router'
  import BottomNavigation from '$containers/BottomNavigation'
  import { bottomNav, showBottomNav, appHeight } from '$stores/layout'
  import { throttle } from 'utils'
  import { getTimeDifference } from 'utils/convertDateAndTimestamp'
  import routes from './routes'
  import BigNumber from 'bignumber.js'
  import versionInfo from './utils/versionInfo'
  import { im } from 'api'
  import { fetchUserKeyInfo } from '$api/index'
  import { userAuth, userVipList } from '$stores/user'
  import { diffTime } from '$stores/common'
  import { goHomeCallback, fetchLangInfo } from '$stores'

  versionInfo()
  $: console.log('=========[im-library] location==========', $location)

  const routeLoading = (event: CustomEvent) => {
    bottomNav.set(event?.detail?.userData?.bottomNav)

    if (event?.detail?.userData?.showBottomNav === false) showBottomNav.set(false)
    else showBottomNav.set(true)
  }

  const setVh = () => {
    const vh = new BigNumber(window.innerHeight * 0.01).toFixed(2)
    document.body.style.setProperty('--vh', `${vh}px`)
    appHeight.set(Number(vh))
  }

  const handleResize = throttle(setVh, 250)

  const fetchUserVipList = async () => {
    const res = await im.userVipList()
    userVipList.set(res.data.list)
    diffTime.set(getTimeDifference(res.serverTime))
  }

  $: if($userAuth.userToken) {
    fetchUserVipList()
    fetchUserKeyInfo()
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
  <Router {routes} on:routeLoading={routeLoading} />
  {#if $showBottomNav}
    <BottomNavigation goHome={() => $goHomeCallback()} />
  {/if}
</main>
