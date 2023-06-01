<script lang='ts'>
import Empty from '$containers/Empty'
import type { IExpertPrediction } from 'api/im/types'

import FoldedExperts from './FoldedExperts.svelte'
import Experts from './Experts.svelte'

import { setGoToDetail, type IGoToDetail } from './context'

export let folder: boolean = false
export let list: IExpertPrediction[]
export let goToDetail: IGoToDetail = null

$: setGoToDetail(goToDetail)

</script>

<div class='pl-[14px] pr-[20px] py-[20px] space-y-10'>
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