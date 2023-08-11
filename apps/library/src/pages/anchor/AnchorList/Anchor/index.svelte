<script lang="ts">
  import { push } from 'svelte-spa-router'
  import type { IWebAnchor, IWebAnchorMatch } from 'api/im/types'
  
  import { goDetailCallback } from '$stores'
  import AnchorCard from '$containers/AnchorCard'
  import { goSportDetailHOF } from '$src/utils/match'
  import { SID } from '$src/constant'
  
  import AnchorLoading from './Loading.svelte'

  export let anchor: IWebAnchor
  export let matchInfo: { data: IWebAnchorMatch, loading: boolean } = null

  const onAnchorClick = () => {
    if(isMatchType) {
      if (matchInfo?.data) goSportDetailHOF(matchInfo?.data, $goDetailCallback)
    } else {
      push(`/anchorChat/${anchor.houseId}`)
    }
  }

  $: isMatchType = anchor.sid !== SID.deposit
</script>

{#if isMatchType && matchInfo?.loading}
  <AnchorLoading />
{:else}
  <div data-id={anchor.houseId} class={$$props.class}>
    <AnchorCard anchor={anchor} match={isMatchType ? matchInfo?.data : null} on:click={onAnchorClick} />
  </div>
{/if}