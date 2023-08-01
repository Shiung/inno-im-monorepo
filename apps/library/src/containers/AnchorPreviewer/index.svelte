<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import type { IWebAnchor } from 'api/im/types'
  import { twMerge } from 'tailwind-merge'

  import AnchorUserImage from '$containers/AnchorUserImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'

  import StreamingPlayer, {
    onError,
    onReady,
    onLostData
  } from '$containers/StreamingPlayer'

  export let anchor: Pick<
    IWebAnchor,
    'houseId'
    | 'playStreamAddress'
    | 'playStreamAddress2'
    | 'userImage'
    | 'liveStatus'
    | 'houseImage'
  >
  export let preview: boolean = false
  export let isMatchType: boolean = false
  export let previewableTopRatio: number
  export let previewableWidth: number

  let dom: HTMLDivElement
  let previewObserver: IntersectionObserver

  const dispatch = createEventDispatcher()

  const createPreviewObserver = (dom: HTMLDivElement) => {
    if (!dom) return

    const marginTop = previewableTopRatio * 100
    const marginBottom = Math.floor(((window.innerHeight * (1 - previewableTopRatio) - previewableWidth) / window.innerHeight) * 100)

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
    previewObserver && previewObserver.disconnect()
  })
</script>

<div data-cid='AnchorPreviewer' class={twMerge('flex w-full h-full space-x-2', $$props.class)} bind:this={dom}>
  <div class={twMerge("flex-none", $$props.previewClass)}>
    <div class='relative'>
      {#if isLive}
        <slot name='badge'>
          <div class="absolute top-0 left-0 z-10">
            <AnchorLiveBadge />
          </div>
        </slot>
      {/if}

      {#if !isPreviewing || streamingLoading}
        <div out:fade|local={{ duration: 250 }} class='absolute'>
          <slot name='image'>
            <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} />
          </slot>
        </div>
      {/if}

      <div class="w-[143px] h-[80px] rounded-[10px] overflow-hidden">
        {#if isPreviewing}
          <StreamingPlayer streaming={anchor} />
        {/if}
      </div>
    </div>
  </div>

  <div class={twMerge("flex-1 overflow-hidden", $$props.contentClass)}>
    <slot></slot>
  </div>
</div>
