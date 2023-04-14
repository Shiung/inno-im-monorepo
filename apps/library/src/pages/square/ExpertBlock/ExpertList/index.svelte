<script lang='ts'>
import { im } from 'api'
import { slide } from 'svelte/transition'
import { Button } from 'ui'
import { t } from '$stores'
import Loading from './Loading.svelte'
import Expert from './Expert/index.svelte'

const predictionsPromise = im.expertPredictions()

let showMore: boolean = false

</script>

<div class='p-[20px] space-y-10'>
  {#await predictionsPromise}
    <Loading />
  {:then prodictions}

    {#each prodictions?.data?.list.slice(0, 3) as prodiction}
      <Expert prodiction={prodiction} /> 
    {/each}

    {#if showMore}
      {#each prodictions?.data?.list.slice(3) as prodiction}
        <div transition:slide>
          <Expert prodiction={prodiction} /> 
        </div>
      {/each}
    {/if}

    <Button class='h-[56px] rounded-[12px] w-full text-[16px]' on:click={() => showMore = true}>
      {$t('common.openMore')}
    </Button>

  {/await}


</div>
