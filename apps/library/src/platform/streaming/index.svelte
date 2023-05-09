<script lang='ts' context='module'>
import { anchor } from '../store'
import { onError as _onError, onReady as _onReady, onLostData as _onLostData } from 'ui/components/FlvPlayer'

export const onError = _onError
export const onReady = _onReady
export const onLostData = _onLostData

export const setStreaming = anchor.streaming.set

</script>

<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'

$: streaming = anchor.streaming
</script>

<FlvPlayer url={$streaming?.playStreamAddress} />
