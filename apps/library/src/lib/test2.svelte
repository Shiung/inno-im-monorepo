<script lang='ts'>
import { onMount } from 'svelte'
import { fetchIp } from 'api'

onMount(() => {
  fetchIp()
})


</script>

<div> this is test2 </div>
