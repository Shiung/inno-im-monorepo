<script lang='ts'>
import Expert from './Expert/index.svelte'
import type { IExpertPredictions } from 'api/im/types'

export let prodictions: IExpertPredictions['res']['data']

</script>

{#each prodictions?.list || [] as prodiction}
  <Expert prodiction={prodiction} /> 
{/each}

