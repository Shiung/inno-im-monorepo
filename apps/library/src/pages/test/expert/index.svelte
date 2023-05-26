<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router'

  import List, { setSid, goToDetail } from '$src/platform/expert'

  onMount(()=>{
    setSid("1")
    setTimeout(() => {
      goToDetail(() => (window.location.href = '/expertDetail/123/plan'))
    }, 1000)
  })

</script>

<List />