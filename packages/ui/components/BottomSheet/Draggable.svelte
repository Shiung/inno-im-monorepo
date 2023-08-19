<script lang="ts">
  import { onDestroy } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  export let timeframe: number = 300
  export let velocity: number = 0.5
  export let isDisabled: boolean
  export let open: boolean
  export let height: number
  export let maxHeight: number
  export let initHeight: number
  export let onMaxHeight: (onMax: boolean) => void

  export let closeH: number

  let timer: ReturnType<typeof setTimeout>
  let dom: HTMLElement
  let moving: boolean = false
  let called: Record<string, boolean> = {
    onResetHeightToMax: false,
    onHeightToMax: false
  }
  let startTime: number
  let startClientY: number
  let startHeight = height

  // https://htmldom.dev/check-if-an-element-is-scrollable/
  function isScrollableY(element: HTMLElement) {
    if (!element) return false
    const { scrollHeight, clientHeight } = element
    const hasScrollableContent = scrollHeight > clientHeight
    const overflowYStyle = window.getComputedStyle(element).overflowY
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1
    return hasScrollableContent && !isOverflowHidden
  }

  function isTouchingScrollableElement(root: HTMLElement, e: TouchEvent) {
    const touches = e.touches
    if (touches.length > 0) {
      const touch = touches[0]
      let target = touch.target as HTMLElement
      while (target) {
        if (target === root) return false
        if (isScrollableY(target)) {
          return true
        }
        target = target.parentNode as HTMLElement
      }
      return true
    }
    return false
  }

  function onResetHeightToMax() {
    if (!called.onResetHeightToMax) {
      onMaxHeight(false)
      called.onResetHeightToMax = true
    }
  }

  function onHeightToMax() {
    height = maxHeight
    if (!called.onHeightToMax) {
      onMaxHeight(true)
      called.onHeightToMax = true
    }
  }

  function onClose() {
    timer = setTimeout(() => {
      open = false
    }, 200)
  }

  function onTouchStart(e: TouchEvent) {
    if (isDisabled) return
    if (!dom) return
    if (isTouchingScrollableElement(dom, e)) return

    called.onResetHeightToMax = false
    called.onHeightToMax = false
    startTime = Date.now()
    startClientY = e.targetTouches[0].clientY
    startHeight = height
    moving = true
  }

  function onTouchMove(e: TouchEvent) {
    if (isDisabled) return
    if (!moving) return

    const deltaY = e.targetTouches[0].clientY - startClientY
    height = startHeight - deltaY

    if (Math.abs(deltaY) > 5) {
      onResetHeightToMax()
    }

    const duration = Date.now() - startTime
    if (duration < timeframe) {
      const currentVelocity = Math.abs(deltaY) / duration
      if (currentVelocity > velocity) {
        moving = false
        if (deltaY > 0) {
          return onSwipeDown()
        } else {
          return onSwipeUp()
        }
      }
    }
  }

  function onTouchEnd() {
    if (isDisabled) return
    moving = false
    if (height <= closeH) {
      onClose()
    }
    if (height >= initHeight + 10) {
      onHeightToMax()
    }
  }

  function onSwipeUp() {
    if (isDisabled) return
    onHeightToMax()
  }

  function onSwipeDown() {
    if (isDisabled) return
    onClose()
  }

  onDestroy(() => {
    clearTimeout(timer)
  })
</script>

<section
  bind:this={dom}
  on:touchstart={onTouchStart}
  class={twMerge($$props.class, !moving && 'will-change-[height] duration-200 ease-out')}
  style:height={`${height}px`}
>
  <slot />
</section>

<svelte:window on:touchmove={onTouchMove} on:touchend={onTouchEnd} />
