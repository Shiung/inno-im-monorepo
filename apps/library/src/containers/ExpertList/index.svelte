<script lang='ts'>
import { im } from 'api'
import Empty from '$containers/Empty'

import Loading from './Loading.svelte'
import Experts from './Experts.svelte'

const predictionsPromise = im.expertPredictions({ query: { matchId: '34kgmi1552wieko' }})


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
