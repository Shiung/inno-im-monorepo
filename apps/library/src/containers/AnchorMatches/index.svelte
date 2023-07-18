<script lang='ts'>
import Match from './Match/index.svelte'
import Empty from '$containers/Empty'
import type { IWebAnchorMatch } from 'api/im/types'

export let data: IWebAnchorMatch[]
</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]'>
    {#if data.length}
      {#each data as match}
        <Match match={match} />
      {/each}
    {:else}
      <Empty class="h-[250px]"/>
    {/if}
</div>
