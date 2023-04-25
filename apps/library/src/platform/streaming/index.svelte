<script lang='ts'>
import { anchor } from '../store'
import LiveStreaming from '$containers/LiveStreaming'

$: streaming = anchor.streaming
</script>

<div class='h-[214px]'>
  <LiveStreaming url={$streaming?.playStreamAddress} />
</div>
