<script lang='ts'>
import { onMount } from 'svelte'
import { fetchIp } from '$lib/actions'

onMount(() => {
  fetchIp()
})


</script>

<div> this is test2 </div>
