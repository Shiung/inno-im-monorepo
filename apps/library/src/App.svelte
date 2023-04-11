<script lang="ts">
import Router, { location } from 'svelte-spa-router'
import routes from './routes'

$: console.log('=========[im-library] location==========', $location)

</script>

<main>
  <Router {routes} />
</main>
