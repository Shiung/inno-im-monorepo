<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import LiveStreaming from '$containers/LiveStreaming'

import AnchorBlock from './AnchorBlock'
import ExpertBlock from './ExpertBlock'

import { convertSid, SID } from 'utils'

$: sid = convertSid($params?.sid)

const headNavIcons = [
  {
    sid: SID.soccer,
    onClick: () => replace(`/square/${SID.soccer}`)
  },
  {
    sid: SID.basketball,
    onClick: () => replace(`/square/${SID.basketball}`)
  },
  {
    sid: SID.tennis,
    onClick: () => replace(`/square/${SID.tennis}`)
  },
  {
    sid: SID.baseball,
    onClick: () => replace(`/square/${SID.baseball}`)
  },
]

</script>

<div class='space-y-[10px]'>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <LiveStreaming />
  <AnchorBlock />
  <ExpertBlock />
</div>
