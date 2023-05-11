<script lang='ts' context='module'>
import { anchor } from '../store'
import {
  onError as _onError,
  onReady as _onReady,
  onLostData as _onLostData,
  onMuted as _onMuted,
  onPaused as _onPaused,
  setMuteHandler as _setMuteHandler,
  setPauseHandler as _setPauseHandler
} from 'ui/components/FlvPlayer'

export const onError = _onError
export const onReady = _onReady
export const onLostData = _onLostData
export const onMuted = _onMuted
export const onPaused = _onPaused

export const setMuteHandler = _setMuteHandler
export const setPauseHandler = _setPauseHandler

export const setStreaming = anchor.streaming.set
export const getStreaming = anchor.streaming.subscribe

</script>

<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'

$: streaming = anchor.streaming
</script>

<FlvPlayer url={$streaming?.playStreamAddress} />
