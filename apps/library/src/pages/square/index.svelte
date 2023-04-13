<script lang='ts'>
import { params } from 'svelte-spa-router'
import HeaderNavigation from '$containers/HeaderNavigation'
import LiveStreaming from '$containers/LiveStreaming'

import AnchorList from './AnchorList'
import Expert from './Expert'

import { SID } from '$types'

const convertSid = (_sid: string): SID => {
  if (_sid === 'all') return SID.all
  return Number(_sid)
  
}
$: sid = convertSid($params?.sid)

</script>

<div class='space-y-[10px]'>
  <HeaderNavigation active={sid} />
  <LiveStreaming />
  <AnchorList />
  <Expert />
</div>
