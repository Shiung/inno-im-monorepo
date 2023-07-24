<script lang='ts' context='module'>
import * as anchor from '../store'

export {
  onError,
  onReady,
  onLostData,
  onMuted,
  onPaused,
  setMute,
  setPause,
  setFullScreen,
  isFlvUse
} from '$containers/StreamingPlayer'

export const setStreaming = anchor.streaming.set
export const getStreaming = anchor.streaming.subscribe

</script>

<script lang='ts'>
import StreamingPlayer from '$containers/StreamingPlayer'

$: streaming = anchor.streaming
</script>

<StreamingPlayer streaming={$streaming} />