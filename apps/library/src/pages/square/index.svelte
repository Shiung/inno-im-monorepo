<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import LiveStreaming from '$containers/LiveStreaming'

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
  },
  {
    sid: 4,
    onClick: () => replace('/square/4')
  },
]

</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <LiveStreaming url='' />
  <div class='space-y-[10px]'>
    <AnchorBlock />
    <ExpertBlock />
  </div>
</div>
