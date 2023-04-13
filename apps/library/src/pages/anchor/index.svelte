<script lang='ts'>
import { params } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'

import AnchorList from './AnchorList'

import { convertSid, SID } from 'utils'

$: sid = convertSid($params?.sid)

const headNavIcons = [
  {
    sid: SID.all,
    onClick: () => console.log(SID.all)
  },
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

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <AnchorList />
</div>
