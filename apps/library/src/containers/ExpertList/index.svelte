<script lang='ts'>
import { im } from 'api'
import Empty from '$containers/Empty'

import Loading from './Loading.svelte'
import Experts from './Experts.svelte'

import type { SidType } from 'utils/types'
import type { IExpertMenu } from '$containers/ExpertWithMenu/types'

export let actived: IExpertMenu['type'] = 0
export let sid: SidType

$: predictionsPromise = im.expertPredictions({
  query: {
    ...(sid && { sid }),
    ...(actived && { type: actived }),
    pageIdx: 1,
    pageSize: 10
}})

</script>

<div class='p-[20px] space-y-10'>
  {#await predictionsPromise}
    <Loading />
  {:then prodictions}

    {#if prodictions?.data?.list?.length === 0}
      <Empty class='h-[300px]'/>
    {:else}
      <Experts prodictions={prodictions.data} />
    {/if}

  {/await}


</div>
