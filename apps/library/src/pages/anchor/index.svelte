<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'

import AnchorList from './AnchorList'

import { convertSid, SID } from 'utils'

$: sid = convertSid($params?.sid)

const headNavIcons = [
  {
    sid: SID.all,
    onClick: () => replace(`/anchor/${SID.all}`)
  },
  {
    sid: SID.soccer,
    onClick: () => replace(`/anchor/${SID.soccer}`)
  },
  {
    sid: SID.basketball,
    onClick: () => replace(`/anchor/${SID.basketball}`)
  },
  {
    sid: SID.tennis,
    onClick: () => replace(`/anchor/${SID.tennis}`)
  },
  {
    sid: SID.baseball,
    onClick: () => replace(`/anchor/${SID.baseball}`)
  },
]
</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <AnchorList />
</div>
