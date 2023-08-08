<script lang='ts'>
import Match from './Match/index.svelte'
import Empty from '$containers/Empty'
import type { IWebAnchorMatch } from 'api/im/types'
import Loading from './Loading.svelte'

export let data: IWebAnchorMatch[]
export let loading: boolean = false
</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]'>
  {#if loading}
    <Loading />
  {:else if data.length}
    {#each data as match}
      <Match match={match} />
    {/each}
  {:else}
    <Empty class="h-[250px]"/>
  {/if}
</div>
