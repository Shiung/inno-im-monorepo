<script lang="ts" context='module'>
  import { isFlvUse } from 'ui/components/FlvPlayer'

  export { isFlvUse }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import FlvPlayer from 'ui/components/FlvPlayer'
  import VideoPlayer from 'ui/components/VideoPlayer'
  import HouseImage from '$containers/AnchorHouseImage'

  import { StreamLiveStatus } from '$src/constant'
  import type { TStreamLiveStatus } from '$src/types'

  export let onReadyCallback = () => {}
  export let onLostDataCallback = () => {}
  export let onErrorCallback = () => {}
  export let onMutedCallback = () => {}
  export let onPausedCallback = () => {}

  export let streaming: {
    playStreamAddress: string;
    playStreamAddress2: string;
    liveStatus: TStreamLiveStatus;
    houseImage: string
  }
  export let useDefControls: boolean = false

  let dom: SvelteComponent

  export const setMute = () => {
    if (!dom) return

    dom?.inMuteHandler()
  }
</script>

<div class="w-full relative">
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
        controls={useDefControls}
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
        controls={useDefControls}
      />
    {/if}
  {:else}
    <HouseImage src={streaming?.houseImage} />
  {/if}

  <slot></slot>
</div>
