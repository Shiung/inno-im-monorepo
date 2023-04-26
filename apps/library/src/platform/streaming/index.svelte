<script lang='ts' context='module'>
import { anchor } from '../store'
export { onError, onReady, onLostData } from 'ui/components/FlvPlayer'

export const setStreaming = anchor.streaming.set

</script>

<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'

$: streaming = anchor.streaming
</script>

<FlvPlayer url={$streaming?.playStreamAddress} />
