<script lang="ts" context='module'>
  import { isFlvUse } from 'ui/components/FlvPlayer'

  export { isFlvUse }
</script>

<script lang="ts">
  import FlvPlayer from 'ui/components/FlvPlayer'
  import VideoPlayer from 'ui/components/VideoPlayer'
  import HouseImage from '$containers/AnchorHouseImage'

  import { StreamLiveStatus } from '$src/constant'
  import type { TStreamLiveStatus } from '$src/types'

  export let onReadyCallback = () => {}
  export let onLostDataCallback = () => {}
  export let onErrorCallback = () => {}
  export let onPausedCallback = () => {}
  export let onMutedCallback = () => {}
  export let streaming: {
    playStreamAddress: string;
    playStreamAddress2: string;
    liveStatus: TStreamLiveStatus;
    houseImage: string
  }
  export let useDefControls: boolean = false

</script>

{#if streaming?.liveStatus === StreamLiveStatus.LIVE}
  {#if isFlvUse}
    <FlvPlayer
      url={streaming?.playStreamAddress}
      controls={useDefControls}
      internal
      internalOnReadyCallback={onReadyCallback}
      internalOnLostDataCallback={onLostDataCallback}
      internalOnErrorCallback={onErrorCallback}
      internalOnPausedCallback={onPausedCallback}
      internalOnMutedCallback={onMutedCallback}
    />
  {:else}
    <VideoPlayer
      urlm3u8={streaming?.playStreamAddress2}
      controls={useDefControls}
      internal
      internalOnReadyCallback={onReadyCallback}
      internalOnErrorCallback={onErrorCallback}
      internalOnPausedCallback={onPausedCallback}
      internalOnMutedCallback={onMutedCallback}
    />
  {/if}
{:else}
  <HouseImage src={streaming?.houseImage} />
{/if}
