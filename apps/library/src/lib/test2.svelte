<script lang='ts'>
import { onMount } from 'svelte'
import { fetchIp } from '$lib/actions'
console.log('test2 haha')

onMount(() => {
  fetchIp()
})


</script>

<div> this is test2 </div>
