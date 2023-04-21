<script lang='ts'>
import { Button } from 'ui'
import { t } from '$stores'
import { slide } from 'svelte/transition'

import Expert from './Expert/index.svelte'
import type { IExpertPredictions } from 'api/im/types'

export let prodictions: IExpertPredictions['res']['data']
let showMore: boolean = false

</script>

{#each prodictions?.list.slice(0, 3) as prodiction}
  <Expert prodiction={prodiction} /> 
{/each}

{#if showMore}
  {#each prodictions?.list.slice(3) as prodiction}
    <div transition:slide>
      <Expert prodiction={prodiction} /> 
    </div>
  {/each}
{/if}

<Button class='h-[56px] rounded-[12px] w-full text-[16px]' on:click={() => showMore = true}>
  {$t('common.openMore')}
</Button>
