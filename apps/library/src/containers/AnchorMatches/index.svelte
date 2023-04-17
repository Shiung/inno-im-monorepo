<script lang='ts'>
import { im } from 'api'

import Loading from './Loading.svelte'
import Match from './Match/index.svelte'

export let houseId: string

const matchesPromise = im.webAnchorsMatchList({ query: { houseId }})

</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]'>
  {#await matchesPromise}
    <Loading />

  {:then matches}

    {#each matches?.data?.matchList as match}
      <Match match={match} />
    {/each}

  {/await}
</div>
