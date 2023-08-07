<script lang="ts">
  import {
    onError as _onError,
    onReady as _onReady,
    onLostData as _onLostData,
    // onMuted as _onMuted,
    // onPaused as _onPaused,
    // setMute as _setMute,
    // setPause as _setPause,
    // setFullScreen as _setFullScreen,
    isFlvUse
  } from 'ui/components/FlvPlayer'
  import {
    onError as _onErrorIOS,
    onReady as _onReadyIOS,
    // onMuted as _onMutedIOS,
    // onPaused as _onPausedIOS,
    // setMute as _setMuteIOS,
    // setPause as _setPauseIOS,
    // setFullScreen as _setFullScreenIOS
  } from 'ui/components/VideoPlayer'

  import FlvPlayer from 'ui/components/FlvPlayer'
  import VideoPlayer from 'ui/components/VideoPlayer'

  import Circle from 'ui/core/button/loading.svelte'
  import HouseImage from '$src/components/HouseImage/index.svelte'
  import type { IWebAnchor } from 'api/im/types'

  import Loading from './Loading.svelte'

  const onError = isFlvUse ? _onError : _onErrorIOS
  const onReady = isFlvUse ? _onReady : _onReadyIOS
  const onLostData = isFlvUse ? _onLostData : _onErrorIOS
  // const onMuted = isFlvUse ? _onMuted : _onMutedIOS
  // const onPaused = isFlvUse ? _onPaused : _onPausedIOS

  // const setMute = isFlvUse ? _setMute : _setMuteIOS
  // const setPause = isFlvUse ? _setPause : _setPauseIOS
  // const setFullScreen = isFlvUse ? _setFullScreen : _setFullScreenIOS

  export let streaming: IWebAnchor
  export let loading: boolean

  let streamLoading = false
  let streamError = false
  let prevStreamUrl: string

  onError(() => {
    streamLoading = false
    streamError = true
  })

  onLostData(() => {
    streamLoading = false
    streamError = true
  })

  onReady(() => {
    streamLoading = false
  })

  const resetStatus = (streaming: IWebAnchor) => {
    streamError = false
    streamLoading = false

    if (!streaming || streaming?.liveStatus !== 2) {
      prevStreamUrl = ''
      return
    }

    if (isFlvUse && streaming?.playStreamAddress !== prevStreamUrl) {
      streamLoading = true
    }
    if (!isFlvUse && streaming?.playStreamAddress2 !== prevStreamUrl) {
      streamLoading = true
    }

    prevStreamUrl = isFlvUse ? streaming?.playStreamAddress : streaming?.playStreamAddress2
  }

  $: resetStatus(streaming)
</script>

{#if loading}
  <Loading />
{:else if streaming}
  <!-- {#if !streamError} -->
  {#if streaming?.liveStatus === 2}
    <div class="relative min-h-[200px]">
      {#if streamLoading}
        <div class="absolute z-10 inset-0 bg-white flex items-center justify-center">
          <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden">
            <Circle stroke="rgb(var(--im-monorepo-primary))" />
          </div>
        </div>
      {/if}

      {#if isFlvUse}
        <FlvPlayer url={streaming?.playStreamAddress} controls />
      {:else}
        <VideoPlayer urlm3u8={streaming?.playStreamAddress2} controls />
      {/if}
    </div>
  {:else}
    <HouseImage src={streaming?.houseImage} />
  {/if}
  <!-- {/if} -->
{:else}
  <div></div>
{/if}
