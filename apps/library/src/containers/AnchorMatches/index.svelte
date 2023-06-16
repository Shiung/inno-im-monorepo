<script lang='ts'>
import Loading from './Loading.svelte'
import Match from './Match/index.svelte'
import { locale } from '$stores'

import { getMatches } from './utils'

export let houseId: string

const matchesPromise = getMatches(houseId, $locale)

</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]'>
  {#await matchesPromise}
    <Loading />

  {:then data}

    {#each data?.matchList as match}
      <Match match={match} />
    {/each}

  {/await}
</div>
