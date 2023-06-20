<script lang='ts' context='module'>
import { push } from 'svelte-spa-router'
import { locale } from '$stores'
let goHomeCallback: () => void = () => push('/')

export let setGoHome = (callback?: () => void) => {
  if (callback) goHomeCallback = callback
}

// plateform 設定im語系
export const setImLocale = locale.set

</script>

<script lang="ts">
import { onDestroy, onMount } from 'svelte'
import Router, { location } from 'svelte-spa-router'
import BottomNavigation from '$containers/BottomNavigation'
import { bottomNav, showBottomNav } from '$stores/layout'
import { throttle } from 'utils'
import routes from './routes'
import BigNumber from 'bignumber.js'
import { appHeight } from '$stores/layout'
import versionInfo from './utils/versionInfo'

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

onMount(() => {
  setVh()
  window.addEventListener('resize', handleResize)
})

onDestroy(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<main class='im-library'>
  <Router {routes} on:routeLoading={routeLoading} />
  {#if $showBottomNav}
    <BottomNavigation goHome={() => goHomeCallback()} />
  {/if}
</main>
