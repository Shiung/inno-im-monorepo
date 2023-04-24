<script lang='ts'>
import { im } from 'api'
import Empty from '$containers/Empty'

import Loading from './Loading.svelte'
import FoldedExperts from './FoldedExperts.svelte'
import Experts from './Experts.svelte'

import type { SidType } from 'utils/types'
import type { IExpertMenu } from '$containers/ExpertWithMenu/types'

export let folder: boolean = false
export let actived: IExpertMenu['type'] = 0
export let sid: SidType

let predictionsPromise: ReturnType<typeof im.expertPredictions>

const fetchPredictions = (sid: SidType, type: typeof actived) => {
  if (sid === null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      ...(type && { type }),
      pageIdx: 1,
      pageSize: 10
  }})
}

$: fetchPredictions(sid, actived)

</script>

<div class='p-[20px] space-y-10'>
  {#await predictionsPromise}
    <Loading />
  {:then prodictions}

    {#if prodictions?.data?.list?.length === 0}
      <Empty class='h-[300px]'/>
    {:else}

      {#if folder}
        <FoldedExperts prodictions={prodictions?.data} />
      {:else}
        <Experts prodictions={prodictions?.data} />
      {/if}

    {/if}

  {/await}


</div>
