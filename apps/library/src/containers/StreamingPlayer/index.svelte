<script lang="ts" context="module">
  import {
    onError as _onError,
    onReady as _onReady,
    onLostData as _onLostData,
    onMuted as _onMuted,
    onPaused as _onPaused,
    setMute as _setMute,
    setPause as _setPause,
    setFullScreen as _setFullScreen,
    isFlvUse
  } from 'ui/components/FlvPlayer'
  import {
    onError as _onErrorIOS,
    onReady as _onReadyIOS,
    onMuted as _onMutedIOS,
    onPaused as _onPausedIOS,
    setMute as _setMuteIOS,
    setPause as _setPauseIOS,
    setFullScreen as _setFullScreenIOS
  } from 'ui/components/VideoPlayer'

  export const onError = isFlvUse ? _onError : _onErrorIOS
  export const onReady = isFlvUse ? _onReady : _onReadyIOS
  export const onLostData = isFlvUse ? _onLostData : _onErrorIOS
  export const onMuted = isFlvUse ? _onMuted : _onMutedIOS
  export const onPaused = isFlvUse ? _onPaused : _onPausedIOS

  export const setMute = isFlvUse ? _setMute : _setMuteIOS
  export const setPause = isFlvUse ? _setPause : _setPauseIOS
  export const setFullScreen = isFlvUse ? _setFullScreen : _setFullScreenIOS

  export { isFlvUse }
</script>

<script lang="ts">
  import FlvPlayer from 'ui/components/FlvPlayer'
  import VideoPlayer from 'ui/components/VideoPlayer'
  import HouseImage from '$src/components/HouseImage/index.svelte'

  export let streaming: {
    playStreamAddress: string;
    playStreamAddress2: string;
    liveStatus: number;
    houseImage: string
  }

  export let useDefControls: boolean = false
</script>

{#if streaming?.liveStatus === 2}
  {#if isFlvUse}
    <FlvPlayer url={streaming?.playStreamAddress} controls={useDefControls} />
  {:else}
    <VideoPlayer urlm3u8={streaming?.playStreamAddress2} controls={useDefControls} />
  {/if}
{:else}
  <HouseImage src={streaming?.houseImage} />
{/if}
