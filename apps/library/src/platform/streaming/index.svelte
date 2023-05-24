<script lang='ts' context='module'>
import { anchor } from '../store'
import {
  onError as _onError,
  onReady as _onReady,
  onLostData as _onLostData,
  onMuted as _onMuted,
  onPaused as _onPaused,
  setMute as _setMute,
  setPause as _setPause,
  setFullScreen as _setFullScreen
} from 'ui/components/FlvPlayer'

export const onError = _onError
export const onReady = _onReady
export const onLostData = _onLostData
export const onMuted = _onMuted
export const onPaused = _onPaused

export const setMute = _setMute
export const setPause = _setPause
export const setFullScreen = _setFullScreen

export const setStreaming = anchor.streaming.set
export const getStreaming = anchor.streaming.subscribe

</script>

<script lang='ts'>
import FlvPlayer from 'ui/components/FlvPlayer'
import HouseImage from '$src/components/HouseImage/index.svelte'

$: streaming = anchor.streaming
</script>

{#if $streaming?.liveStatus === 2}
  <FlvPlayer url={$streaming?.playStreamAddress} />
{:else}
  <HouseImage src={$streaming?.houseImage} />
{/if}
