<script lang='ts'>
import Expert from './Expert/index.svelte'
import type { IExpertPrediction } from 'api/im/types'

export let list: IExpertPrediction[]

</script>

{#each list || [] as prodiction}
  <Expert prodiction={prodiction} /> 
{/each}

