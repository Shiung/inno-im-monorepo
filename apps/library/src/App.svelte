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
import Router, { location } from 'svelte-spa-router'
import BottomNavigation from '$containers/BottomNavigation'
import { bottomNav, showBottomNav } from '$stores/layout'

import routes from './routes'

$: console.log('=========[im-library] location==========', $location)

const routeLoading = (event: CustomEvent) => {
  bottomNav.set(event?.detail?.userData?.bottomNav)

  if (event?.detail?.userData?.showBottomNav === false) showBottomNav.set(false)
  else showBottomNav.set(true)
}
</script>

<main class='im-library'>
  <Router {routes} on:routeLoading={routeLoading} />
  {#if $showBottomNav}
    <BottomNavigation goHome={() => goHomeCallback()} />
  {/if}
</main>
