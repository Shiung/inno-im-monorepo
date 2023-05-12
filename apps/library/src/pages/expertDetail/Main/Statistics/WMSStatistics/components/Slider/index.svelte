<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  export let data: any[]
  export let padding: number = 8
  export let width: string | number = '90%'
  export let swipeThreshold: number = 0.3

  let movable = false
  let slider: HTMLDivElement | null = null
  let sliderContainer: HTMLDivElement | null = null
  let transitioning: boolean = false
  let touchStartX: number | null = null
  let calWidth: number = 0
  $: slides = data.slice(-2).concat(data).concat(data.slice(0, 2))
  const slidesBeginIndex = 0
  const slidesFirstIndex = 2
  $: slidesEndIndex = slides.length - 1
  $: slidesLastIndex = slidesEndIndex - 2
  let currentIndex = slidesFirstIndex

  const calculateWidth = (width: string | number, parent: HTMLDivElement | null): number => {
    if(typeof width === 'number') return width

    if(!parent) return
    let retWidth: number = 0
    if(/%/.test(width)) {
      const [percent] = width.split('%')
      const percentage = parseFloat(percent) / 100
      retWidth = parent.getBoundingClientRect().width * percentage
    } else if (/px/.test(width)) {
      const [number] = width.split('px')
      retWidth = parseFloat(number)
    } else {
      console.warn('Invalid Width property!', width)
      retWidth = 0
    }

    return retWidth
  }

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault()
    if(!('touches' in e) || transitioning) return

    touchStartX = e.touches[0].clientX || null
    movable = true
  }

  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if(!('touches' in e) || !movable) return

    const touchMoveX = e.touches[0].clientX
    const distance = touchMoveX - touchStartX
    slider.style.transform = `translateX(${calculateDistance(currentIndex) + distance}px)`

    if(touchMoveX < 0) {
      setIndex(currentIndex + 1)
      movable = false
    } else if (touchMoveX > window.innerWidth) {
      setIndex(currentIndex - 1)
      movable = false
    }
  }

  const onTouchEnd = (e: TouchEvent) => {
    e.preventDefault()
    if(!('touches' in e) || !movable) return

    const touchEndX = e.changedTouches[0].clientX
    const distance = touchStartX - touchEndX

    if(Math.abs(distance) > calWidth * swipeThreshold) {
      setIndex(distance < 0 ? currentIndex - 1 : currentIndex + 1)
    } else {
      handleTransition(currentIndex, false)
    }
    movable = false
  }

  const setTransitioning = (val: boolean) => {
    transitioning = val
  }

  const setIndex = (val: number) => {
    currentIndex = val
  }

  const handleTransitionEnd = () => {
    if (slider) {
      slider.style.transitionProperty = 'none'
      if(currentIndex === slidesEndIndex - 1) {
        setIndex(slidesFirstIndex)
        setTransitioning(true)
      } else if (currentIndex === slidesBeginIndex + 1) {
        setIndex(slidesLastIndex)
        setTransitioning(true)
      }
    }
  }

  const handleTransition = (index: number, transitioning: boolean) => {
    if(slider) {
      !transitioning && (slider.style.transitionProperty = 'transform')
      slider.style.transform = `translateX(${calculateDistance(index)}px)`
      transitioning && setTransitioning(false)
    }
  }

  const calculateDistance = (index: number) => {
    return -index * (calWidth + padding) + Math.floor((window.innerWidth - calWidth) / 2)
  }

  $: handleTransition(currentIndex, transitioning)

  onMount(() => {
    if(sliderContainer) {
      calWidth = calculateWidth(width, sliderContainer)
    }
    if(slider) {
      slider.style.transform = `translateX(${calculateDistance(currentIndex)}px)`
      slider.style.transitionProperty = 'none'
      slider.addEventListener('transitionend', handleTransitionEnd)
    }
  })

  onDestroy(() => {
    slider && slider.removeEventListener('transitionend', handleTransitionEnd)
  })
</script>

{#if data.length}
  <div
    bind:this={sliderContainer}
    class="mb-5 h-[68px] overflow-hidden"
    on:touchstart|nonpassive={onTouchStart}
    on:touchmove|nonpassive={onTouchMove}
    on:touchend|nonpassive={onTouchEnd}
  >
    <div
      bind:this={slider}
      class="h-[63px] flex flex-nowrap items-center ease-in-out duration-500 will-change-transform"
      style:width={`${slides.length * (calWidth + padding)}px`}
    >
      {#each slides as slide}
        <div class="h-full" style:width={`${calWidth}px`} style:margin-right={`${padding}px`}>
          <slot item={slide}></slot>
        </div>
      {/each}
    </div>
  </div>
{/if}