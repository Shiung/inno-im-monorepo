<script lang='ts'>
import { onMount } from 'svelte'
import { fetchArchorList } from '../service'

onMount(() => {
  fetchArchorList()
})

</script>

<div>
 anchor
</div>
