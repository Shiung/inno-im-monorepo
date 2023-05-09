<script lang="ts">
  import type { IExpertStatistics } from 'api/im/types'
  import StatsBlock from './StatsBlock/index.svelte'
  export let infos: IExpertStatistics['res']['data']['info'] = []

  let movable = false
  let slider
  let index: number = 1
  let transitioning: boolean = false
  let touchStart: { x: number | null; y: number | null } = { x: null, y: null }

  const START_INDEX = 0;
  $: END_INDEX = infos.length - 1

  const onTouchStart = (e: TouchEvent) => {
    if(!('touches' in e)) return
    if(movable) return

    movable = true
    touchStart = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if(!('touches' in e)) return
    if(!movable) return

    const { clientX } = e.touches[0]

    const distance = clientX - touchStart.x

    slider.style.transform = `translateX(${(index * -351) + distance}px)`
  }
  const onTouchEnd = (e: TouchEvent) => {
    if(!('touches' in e)) return
    if(!movable) return

    const distance = touchStart.x - e.changedTouches[0].clientX
    if(Math.abs(distance) > 351 * 0.5) {
      index = distance < 0 ? index - 1 : index + 1
    } else {
      handleTransition(index, false)
    }
    movable = false
  }

  const translate = (key, index) => {
    let translate = 0
    if(key === END_INDEX && index <= START_INDEX) {
      translate = -1 * infos.length * 351
    } else if (key === START_INDEX && index >= END_INDEX) {
      translate = infos.length * 351
    }
    return `translateX(${translate}px)`
  }

  const setIndex = () => {
    if(index === END_INDEX + 1) {
      index = START_INDEX
      setTransitioning(true)
    } else if (index === START_INDEX - 1) {
      index = END_INDEX
      setTransitioning(true)
    }
  }

  const setTransitioning = (val) => {
    transitioning = val
  }

  const handleTransition = (index, transitioning) => {
    const _transitionEnd = () => {
      if (slider) {
        slider.style.transitionProperty = 'none'
        setIndex()
        slider.removeEventListener("transitionend", _transitionEnd)
      }
    }

    if(slider) {
      !transitioning && (slider.style.transitionProperty = 'transform')
      const distance = -index * 351
      slider.style.transform = `translateX(${distance}px)`
      slider.addEventListener('transitionend', _transitionEnd)
      if(transitioning) setTransitioning(false)
    }
  }

  $: handleTransition(index, transitioning)
</script>

<div class="mb-5 h-[68px] overflow-hidden">
  <div
    bind:this={slider}
    class="h-[63px] flex flex-nowrap items-center ease-in-out duration-500"
    style:width={`${infos.length * 351}px`}
    on:touchstart={onTouchStart}
    on:touchmove={onTouchMove}
    on:touchend={onTouchEnd}
  >
    {#each infos as info, key}
      <div
      class="w-[343px] h-full mr-[8px]"
      style:transform={translate(key, index)}
      >
        <StatsBlock info={info} />
      </div>
    {/each}
  </div>
</div>