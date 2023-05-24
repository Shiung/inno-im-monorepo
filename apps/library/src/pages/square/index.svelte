<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'
import { params, replace } from 'svelte-spa-router'

import HeaderNavigation from '$containers/HeaderNavigation'
import HouseImage from '$src/components/HouseImage/index.svelte'

import AnchorBlock from './AnchorBlock'
import ExpertBlock from './ExpertBlock'

import { convertSid, type SidType } from 'utils'

$: sid = convertSid($params?.sid)

const headNavIcons: { sid: SidType, onClick: () => void }[] = [
  {
    sid: 1,
    onClick: () => replace('/square/1')
  },
  {
    sid: 2,
    onClick: () => replace('/square/2')
  },
  {
    sid: 3,
    onClick: () => replace('/square/3')
  }
]

</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />

  <div class='space-y-[10px]'>
    {#if $streaming?.liveStatus === 1}
      <HouseImage src={$streaming.houseImage} />
    {:else}
      <FlvPlayer url={$streaming?.playStreamAddress} />
    {/if}

    <AnchorBlock />
    {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if}
  </div>
</div>
