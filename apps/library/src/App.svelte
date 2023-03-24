<script lang="ts">
import Router, { location } from 'svelte-spa-router'
import routes from './routes'

$: console.log('=========[im-library] location==========', $location)

</script>


<main>
  <a href="/"> go to Entry </a>
  <a href="#/uikit"> go to uikit </a>
  <a href="#/test"> go to test </a>

  <Router {routes} />
</main>
