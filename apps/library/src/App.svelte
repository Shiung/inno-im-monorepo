<script lang="ts">
import Router, { location } from 'svelte-spa-router'
import BottomNavigation from '$containers/BottomNavigation'
import { bottomNav } from '$stores/layout'

import routes from './routes'

$: console.log('=========[im-library] location==========', $location)

const routeLoading = (event: CustomEvent) => {
  bottomNav.set(event?.detail?.userData?.bottomNav)
}

</script>

<main class='im-library'>
  <Router {routes} on:routeLoading={routeLoading} />
  <BottomNavigation />
</main>
