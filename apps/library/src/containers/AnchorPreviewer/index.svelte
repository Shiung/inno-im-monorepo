<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import type { IWebAnchor } from 'api/im/types'

  import StreamingPlayer, {
    onError,
    onReady,
    onLostData
  } from '$containers/StreamingPlayer'
  
  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from './config'
  import { twMerge } from 'tailwind-merge'

  export let anchor: IWebAnchor
  export let preview: boolean = false

  let dom: HTMLDivElement
  let matchObserver: IntersectionObserver
  let previewObserver: IntersectionObserver

  const dispatch = createEventDispatcher()

  const createPreviewObserver = (dom: HTMLDivElement) => {
    if (!dom) return

    let marginTop = PREVIEW_BAR_TOP_RATIO * 100
    let marginBottom = Math.floor(((window.innerHeight * (1 - PREVIEW_BAR_TOP_RATIO) - PREVIEW_BAR_WIDTH) / window.innerHeight) * 100)

    const previewObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY !== 0 && isLive) {
            dispatch('preview', anchor.houseId)
          }
        }
      },
      { root: null, rootMargin: `${-marginTop}% 0% ${-marginBottom}% 0%` }
    )

    previewObserver.observe(dom)

    return previewObserver
  }

  const regStreamingCallbacks = (active: boolean) => {
    if(!active) return

    streamingLoading = true

    onReady(() => {
      streamingLoading = false
      streamingError = false
    })

    onError(() => {
      streamingLoading = false
      streamingError = true
    })

    onLostData(() => {
      streamingLoading = false
      streamingError = true
    })
  }

  $: previewObserver = createPreviewObserver(dom)

  let streamingLoading: boolean = false
  let streamingError: boolean = false

  $: isLive = anchor.liveStatus === 2
  $: isPreviewing = preview && isLive

  $: regStreamingCallbacks(isPreviewing)

  onDestroy(() => {
    matchObserver && matchObserver.disconnect()
    previewObserver && previewObserver.disconnect()
  })
</script>

<div class={twMerge($$props.class)} bind:this={dom}>
  {#if isLive}
    <slot name='badge'></slot>
  {/if}

  {#if !isPreviewing || streamingLoading}
    <div out:fade|local={{ duration: 250 }} class='absolute'>
      <slot name='image'></slot>
      <!-- <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} /> -->
    </div>
  {/if}

  <div class="w-[143px] h-[80px] rounded-[10px] overflow-hidden">
    {#if isPreviewing}
      <StreamingPlayer streaming={anchor} />
    {/if}
  </div>
</div>
