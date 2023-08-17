<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Router, { location, replace } from 'svelte-spa-router'
  import BottomNavigation from '$containers/BottomNavigation'
  import { getTimeDifference } from 'utils/convertDateAndTimestamp'
  import routes from './routes'
  import versionInfo from './utils/versionInfo'
  import { regWindowSizeListener } from './utils/listener'
  import { im } from 'api'
  import { fetchUserKeyInfo } from '$api'
  import { goHomeCallback, fetchLangInfo, userAuth, userVipList, diffTime, bottomNav, showBottomNav, showNavTab, setImVh, isLg } from '$stores'
  import { CODE_STATUS_OK } from '$src/constant'

  import NavigationTab from '$containers/NavigationTab'

  versionInfo()
  $: console.log('=========[im-library] location==========', $location)

  const routeLoading = (event: CustomEvent) => {
    const userData = event?.detail?.userData || {};

    bottomNav.set(userData.bottomNav);

    showBottomNav.set(userData.showBottomNav !== false);
    showNavTab.set(userData.showNavTab !== false);
  }

  const conditionsFailed = (event: CustomEvent) => {
    if (event?.detail?.userData?.isExpertRelevant) replace('/expert/0')
  }

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

  const unRegListener = regWindowSizeListener([setImVh])

  onMount(() => {
    setImVh()
    fetchLangInfo()
  })

  onDestroy(() => {
    unRegListener && unRegListener()
  })
</script>

<main class="im-library">
  <div class='im-base'>
    <div class='xl:max-w-[1280px] mx-auto'>
      {#if $showNavTab && $isLg}
        <div class="px-[20px] pt-[16px] mb-[12px]">
          <NavigationTab />
        </div>
      {/if}
      
      <Router {routes} on:conditionsFailed={conditionsFailed} on:routeLoading={routeLoading} />

      {#if $showBottomNav && !$isLg}
        <BottomNavigation goHome={() => $goHomeCallback()} />
      {/if}
    </div>
  </div>
</main>
