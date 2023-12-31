<script lang="ts">
  import { onMount } from 'svelte'
  import {
    calculate,
    getBoundingRect,
    calDragDistance,
    isOverThreshold,
    isOutsideBoundary,
    isSecondElement,
    isLastTwoElement,
    getTouchClientX,
    createSlide
  } from './utils'

  export let data: any[]
  export let xPadding: number = 8
  export let yPadding: number = 6
  export let width: string | number = '90%'
  export let height: string | number  = 63
  export let swipeThreshold: number = 0.3
  export let needSlide: boolean = true

  let movable = false
  let transitioning: boolean = false

  let slider: HTMLDivElement | null = null
  let sliderContainer: HTMLDivElement | null = null

  let calWidth: number = 0
  let calHeight: number = 0

  $: slides = createSlide(data, needSlide)
  const slidesFirstIndex = needSlide ? 2 : 0
  $: slidesLength = slides.length
  $: slidesLastIndex = slidesLength - 3
  let currentIndex = slidesFirstIndex
  let touchStartX: number = 0

  const onTouchStart = (e: TouchEvent) => {
    if(!needSlide) return
    if(!('touches' in e)) return
    e.preventDefault()

    touchStartX = getTouchClientX('touchstart', e)
    movable = true
  }

  const onTouchMove = (e: TouchEvent) => {
    if(!needSlide) return
    if(!('touches' in e) || !movable) return
    e.preventDefault()
    
    const touchMoveX = getTouchClientX('touchmove', e)
    const distance = touchMoveX - touchStartX
    let totalDistance

    if(isLastTwoElement(currentIndex, slidesLength)) {
      setSliderTransitionProperty('none')
      setCurrentIndex(slidesFirstIndex)
    } else if (isSecondElement(currentIndex)) {
      setSliderTransitionProperty('none')
      setCurrentIndex(slidesLastIndex)
    }

    totalDistance = distance + calDragDistance(currentIndex, calWidth, xPadding, sliderContainer)
    setSliderTranslateX(totalDistance)

    if (isOutsideBoundary(touchMoveX, sliderContainer)) {
      const newIndex = touchMoveX < getBoundingRect(sliderContainer, 'left') ? currentIndex + 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      movable = false
    }
  }

  const onTouchEnd = (e: TouchEvent) => {
    if(!needSlide) return
    if(!('touches' in e) || !movable) return
    e.preventDefault()

    const touchEndX = getTouchClientX('touchend', e)
    const distance = touchEndX - touchStartX

    movable = false

    if(isOverThreshold(distance, calWidth, swipeThreshold)) {
      const newIndex = distance < 0 ? currentIndex + 1 : currentIndex - 1
      setCurrentIndex(newIndex)
    } else {
      handleSwipe(currentIndex, false)
    }
  }

  const setTransitioning = (val: boolean) => {
    transitioning = val
  }

  const setCurrentIndex = (val: number) => {
    currentIndex = val
  }

  const onTransitionEnd = () => {
    if(movable) return

    setSliderTransitionProperty('none')

    if(isLastTwoElement(currentIndex, slidesLength)) {
      setCurrentIndex(slidesFirstIndex)
      setTransitioning(true)
    } else if (isSecondElement(currentIndex)) {
      setCurrentIndex(slidesLastIndex)
      setTransitioning(true)
    }
  }

  const handleSwipe = (index: number, transitioning: boolean) => {
    if(movable) return

    if(!transitioning) setSliderTransitionProperty('transform')
    else setTransitioning(false)

    setSliderTranslateX(calDragDistance(index, calWidth, xPadding, sliderContainer))
  }

  const setSliderTranslateX = (distance: number) => {
    if(slider) slider.style.transform = `translateX(${distance}px)`
  }

  const setSliderTransitionProperty = (style: 'none' | 'transform') => {
    if(slider) slider.style.transitionProperty = style
  }

  $: handleSwipe(currentIndex, transitioning)

  onMount(() => {
    if(sliderContainer) {
      calWidth = calculate('width', width, sliderContainer)
      calHeight = calculate('height', height)
    }

    setSliderTransitionProperty('none')
    setSliderTranslateX(calDragDistance(currentIndex, calWidth, xPadding, sliderContainer))
  })
</script>

{#if data.length && $$slots.default}
  <div
    data-cid='Slider'
    data-tid='Slider'
    bind:this={sliderContainer}
    class="overflow-hidden"
    style:margin-top={`${yPadding}px`}
    style:margin-bottom={`${yPadding}px`}
    on:touchstart|nonpassive={onTouchStart}
    on:touchmove|nonpassive={onTouchMove}
    on:touchend|nonpassive={onTouchEnd}
    on:transitionend={onTransitionEnd}
  >
    <div
      bind:this={slider}
      class="flex flex-nowrap items-center ease-in-out duration-500 will-change-transform"
      style:min-width={`${slidesLength * (calWidth + xPadding)}px`}
      style:height={`${calHeight}px`}
    >
      {#each slides as slide}
        <div data-class='slide' class="h-full" style:width={`${calWidth}px`} style:margin-right={`${xPadding}px`}>
          <slot item={slide}></slot>
        </div>
      {/each}
    </div>
  </div>
{/if}