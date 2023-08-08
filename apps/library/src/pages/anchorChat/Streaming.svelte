<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import InStreamingPlayer from '$containers/InStreamingPlayer'
  import type { IWebAnchor } from 'api/im/types'

  export let streaming: Omit<IWebAnchor, 'matchCount'>

  let videoHeight: number
  let streamLoading = false
  let streamError = false
  let streamOnReadyCb
  let streamOnErrorCb
  let streamOnLostDataCb
  let dom: HTMLDivElement

  const dispatch = createEventDispatcher()

  const regStreamingCallbacks = () => {
    streamOnReadyCb = () => {
      streamLoading = false
      streamError = false
    }

    streamOnErrorCb = () => {
      streamLoading = false
      streamError = true
    }

    streamOnLostDataCb = () => {
      streamLoading = false
      streamError = true
    }
  }

  regStreamingCallbacks()

  let observer = new ResizeObserver(() => {
    videoHeight = dom?.getBoundingClientRect()?.height || 0
    dispatch('heightChange', dom?.getBoundingClientRect()?.height || 0)
  })

  $: dom && observer.observe(dom)

  onDestroy(() => {
    observer && observer.disconnect()
    observer = null
  })
</script>

<div data-cid='AnchorChat_Streaming'>
  <div bind:this={dom} class='fixed left-0 right-0 top-[44px] z-[30]'>
    <InStreamingPlayer
      {streaming}
      useDefControls
      onReadyCallback={streamOnReadyCb}
      onErrorCallback={streamOnErrorCb}
      onLostDataCallback={streamOnLostDataCb}
    />
  </div>

  <div style:height={`${videoHeight}px`}></div>
</div>