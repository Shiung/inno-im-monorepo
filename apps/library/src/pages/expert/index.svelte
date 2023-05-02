<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import ExpertWithMenu from '$containers/ExpertWithMenu'

import { convertSid, type SidType } from 'utils'

$: sid = convertSid($params?.expertSid)

const headNavIcons: {sid: SidType, onClick: () => void}[] = [
  {
    sid: 0,
    onClick: () => replace('/expert/0')
  },
  {
    sid: 1,
    onClick: () => replace('/expert/1')
  },
  {
    sid: 2,
    onClick: () => replace('/expert/2')
  }
]
</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  <ExpertWithMenu sid={sid} />
</div>

