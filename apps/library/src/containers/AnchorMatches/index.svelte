<script lang='ts'>
import Loading from './Loading.svelte'
import Match from './Match/index.svelte'
import { locale } from '$stores'
import Empty from '$containers/Empty'

import { getMatches } from './utils'

export let houseId: string

const matchesPromise = getMatches(houseId, $locale)

</script>

<div data-cid='Anchor_Matches' class='pt-[12px] space-y-[12px] px-[20px]'>
  {#await matchesPromise}
    <Loading />

  {:then data}
    {@const { matchList } = data || {}}

    {#if matchList.length}
      {#each matchList as match}
        <Match match={match} />
      {/each}
    {:else}
      <Empty class="h-[250px]"/>
    {/if}

  {/await}
</div>
