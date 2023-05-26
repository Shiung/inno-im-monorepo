<script lang='ts'>
import Empty from '$containers/Empty'

import FoldedExperts from './FoldedExperts.svelte'
import Experts from './Experts.svelte'

import type { IExpertPrediction } from 'api/im/types'

export let folder: boolean = false
export let list: IExpertPrediction[]

</script>

<div class='p-[20px] space-y-10'>
  {#if list.length === 0}
    <Empty class='h-[300px]'/>
  {:else}

    {#if folder}
      <FoldedExperts list={list} />
    {:else}
      <Experts list={list} />
    {/if}

  {/if}
</div>