<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import { fly } from 'svelte/transition'
  import { getInfo } from '../context'

  const { displayType, height, expandAnimation } = getInfo()
  const dispatch = createEventDispatcher()

  let startY: number
  export let isTransition: boolean

  $: isWindow = $displayType === 'window'

  // use window.innerHeight for compatibility between ios and android
  $: boxContainerHeight = `${window.innerHeight - $height}px`

  const onTouchStart = (e: TouchEvent) => {
    if (!('touches' in e)) return

    startY = e.touches[0].clientY
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!('touches' in e)) return

    const moveY = e.touches[0].clientY
    dispatch('onTouchMoveChange', startY - moveY)
  }
</script>

<div
  class={twMerge('relative flex flex-1 flex-col bg-white', isWindow && isTransition && 'fixed w-full z-30 bottom-0')}
  style:min-height={isWindow ? boxContainerHeight : '100%'}
  style:max-height={isWindow ? (!isTransition ? 'none' : boxContainerHeight) : '100%'}
  transition:fly|local={$expandAnimation && { y: isWindow ? window.innerHeight - $height : '100%', duration: 500 }}
  on:introend={() => {
    dispatch('isTransitionChange', false)
  }}
  on:outroend={() => {
    dispatch('isTransitionChange', false)
  }}
  on:touchstart={onTouchStart}
  on:touchmove={onTouchMove}
>
  <slot name='header'></slot>
  <slot name='messages'></slot>
  <slot name='input'></slot>
  <slot></slot>

  <div class="absolute inset-0 bg-white z-[-1]" />
</div>