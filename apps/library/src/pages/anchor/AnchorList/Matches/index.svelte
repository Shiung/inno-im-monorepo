<script lang='ts'>
import { im } from 'api'
import { slide } from 'svelte/transition'

import Loading from './Loading.svelte'
import Match from './Match/index.svelte'

const matchesPromise = im.webAnchorsMatchList()

</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]' transition:slide|local>
  {#await matchesPromise}
    <Loading />

  {:then matches}

    {#each matches?.data?.matchList as match}
      <Match match={match} />
    {/each}

  {/await}
</div>
