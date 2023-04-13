<script lang='ts'>
import { params } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import LiveStreaming from '$containers/LiveStreaming'

import AnchorBlock from './AnchorBlock'
import ExpertBlock from './ExpertBlock'

import { convertSid, SID } from 'utils'

$: sid = convertSid($params?.sid)

const headNavIcons = [
  {
    sid: SID.soccer,
    onClick: () => console.log(SID.soccer)
  },
  {
    sid: SID.basketball,
    onClick: () => console.log(SID.basketball)
  },
  {
    sid: SID.tennis,
    onClick: () => console.log(SID.tennis)
  },
  {
    sid: SID.baseball,
    onClick: () => console.log(SID.baseball)
  },
]

</script>

<div class='space-y-[10px]'>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <LiveStreaming />
  <AnchorBlock />
  <ExpertBlock />
</div>
