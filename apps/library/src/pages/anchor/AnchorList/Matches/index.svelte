<script lang='ts'>
import { slide } from 'svelte/transition'
import { fetchAnchorMatches } from '../../service'

import Loading from './Loading.svelte'
import Match from './Match/index.svelte'

const matchesPromise = fetchAnchorMatches()

</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]' transition:slide|local>
  {#await matchesPromise}
    <Loading />

  {:then data}

    {#each data.matchList as match}
      <Match match={match} />
    {/each}

  {/await}
</div>
