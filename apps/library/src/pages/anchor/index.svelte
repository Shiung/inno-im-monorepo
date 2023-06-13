<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import { locale } from '$stores'

import AnchorList from './AnchorList'

import { convertSid, type SidType } from 'utils'

$: sid = convertSid($params?.anchorSid)

const headNavIcons: {sid: SidType, onClick: () => void}[] = [
  {
    sid: 0,
    onClick: () => replace('/anchor/0')
  },
  {
    sid: 1,
    onClick: () => replace('/anchor/1')
  },
  {
    sid: 2,
    onClick: () => replace('/anchor/2')
  },
  {
    sid: 3,
    onClick: () => replace('/anchor/3')
  }
]
</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  {#key $locale}
    <AnchorList />
  {/key}  
</div>
