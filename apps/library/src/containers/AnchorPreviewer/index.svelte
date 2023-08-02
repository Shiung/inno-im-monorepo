<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import type { IWebAnchor } from 'api/im/types'
  import { twMerge } from 'tailwind-merge'

  import AnchorUserImage from '$containers/AnchorUserImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'

  import InStreamingPlayer from '$src/containers/InStreamingPlayer'

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
  let streamOnReadyCb
  let streamOnErrorCb
  let streamOnLostDataCb
  let streamingLoading: boolean = false
  let streamingError: boolean = false

  const dispatch = createEventDispatcher()

  const createPreviewObserver = (dom: HTMLDivElement, topRatio: number, width: number) => {
    if (!dom) return

    previewObserver && previewObserver.disconnect()

    const marginTop = topRatio * 100
    const marginBottom = ((window.innerHeight * (1 - topRatio) - width) / window.innerHeight) * 100

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY !== 0 && isLive) {
            dispatch('preview', anchor.houseId)
          }
        }
      },
      { root: null, rootMargin: `${-marginTop}% 0% ${-marginBottom}% 0%` }
    )

    observer.observe(dom)

    return observer
  }

  const regStreamingCallbacks = (active: boolean) => {
    if(!active) return

    streamingLoading = true

    streamOnReadyCb = (() => {
      streamingLoading = false
      streamingError = false
    })

    streamOnErrorCb = (() => {
      streamingLoading = false
      streamingError = true
    })

    streamOnLostDataCb = (() => {
      streamingLoading = false
      streamingError = true
    })
  }

  $: previewObserver = createPreviewObserver(dom, previewableTopRatio, previewableWidth)

  $: isLive = anchor.liveStatus === 2
  $: isPreviewing = preview && isLive

  $: regStreamingCallbacks(isPreviewing)

  onDestroy(() => {
    previewObserver && previewObserver.disconnect()
  })
</script>

<div data-cid='AnchorPreviewer' class={twMerge('flex w-full h-full space-x-2', $$props.class)} bind:this={dom}>
  <div class={twMerge("flex-none h-full flex items-center", $$props.previewClass)}>
    <div class='w-full h-full relative'>
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

      <div class="rounded-[10px] overflow-hidden">
        {#if isPreviewing}
          <InStreamingPlayer
            onReadyCallback={streamOnReadyCb}
            onErrorCallback={streamOnErrorCb}
            onLostDataCallback={streamOnLostDataCb}
            streaming={anchor}
          />
        {/if}
      </div>
    </div>
  </div>

  <div class={twMerge("flex-1 overflow-hidden", $$props.contentClass)}>
    <slot></slot>
  </div>
</div>
