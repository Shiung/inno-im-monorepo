<script lang="ts" context='module'>
  import { isFlvUse } from 'ui/components/FlvPlayer'

  export { isFlvUse }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import FlvPlayer from 'ui/components/FlvPlayer'
  import VideoPlayer from 'ui/components/VideoPlayer'
  import HouseImage from '$containers/AnchorHouseImage'
  import VideoControls from '$containers/VideoControls/index.svelte'

  import { StreamLiveStatus } from '$src/constant'
  import type { TStreamLiveStatus } from '$src/types'

  export let onReadyCallback = () => {}
  export let onLostDataCallback = () => {}
  export let onErrorCallback = () => {}
  export let streaming: {
    playStreamAddress: string;
    playStreamAddress2: string;
    liveStatus: TStreamLiveStatus;
    houseImage: string
  }
  export let useDefControls: boolean = false

  let showControls = false
  let muted = false
  let paused = false
  let dom: SvelteComponent

  const onMutedCallback = (m: boolean) => {
    muted = m
  }

  const onPausedCallback = (p: boolean) => {
    paused = p
  }
</script>

<div 
  on:click={() => {
  if (useDefControls) showControls = true
  }} 
  on:keypress
  class="relative"
>
  {#if streaming?.liveStatus === StreamLiveStatus.LIVE}
    {#if isFlvUse}
      <FlvPlayer
        bind:this={dom}
        url={streaming?.playStreamAddress}
        internal
        internalOnReadyCallback={onReadyCallback}
        internalOnLostDataCallback={onLostDataCallback}
        internalOnErrorCallback={onErrorCallback}
        internalOnPausedCallback={onPausedCallback}
        internalOnMutedCallback={onMutedCallback}
      />
    {:else}
      <VideoPlayer
        bind:this={dom}
        urlm3u8={streaming?.playStreamAddress2}
        internal
        internalOnReadyCallback={onReadyCallback}
        internalOnErrorCallback={onErrorCallback}
        internalOnPausedCallback={onPausedCallback}
        internalOnMutedCallback={onMutedCallback}
      />
    {/if}

    {#if useDefControls}
      <VideoControls 
        bind:showControls
        bind:paused
        bind:muted
        setPause={() => dom?.inPauseHandler(true)}
        setMute={dom?.inMuteHandler}
        setFullScreen={dom?.inFullScreenHandler}
      />
    {/if}
  {:else}
    <HouseImage src={streaming?.houseImage} />
  {/if}
</div>
