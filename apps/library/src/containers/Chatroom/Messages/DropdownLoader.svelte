<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { getMobileOSInfo, MobileOS } from 'utils'
  import { t } from '$stores'
  import { Ripple } from 'ui'
  import Circle from 'ui/core/button/loading.svelte'

  import DoubleArrow from '../images/double_arrow_down_small.svg'
  import { getInfo } from '../context'
  import { chatEnv } from '../controller'

  const dispatch = createEventDispatcher()

  export let root: HTMLDivElement
  export let loading: boolean

  let dom: HTMLDivElement
  let canLoadmore: boolean

  const { displayType, height } = getInfo()
  $: isWindow = $displayType === 'window'

  const isIOS = getMobileOSInfo() === MobileOS.iOS
  $: controlledRoot = isIOS ? document.documentElement : document.body

  let intersectionObserver = null
  $: {
    if (intersectionObserver) intersectionObserver.disconnect()

    intersectionObserver = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          canLoadmore = entry.isIntersecting
        }
      },
      { root: !isWindow ? root : null, rootMargin: `${!isWindow ? 0 : -($height + 44)}px 0px 0px 0px` }
    )

    if (dom) intersectionObserver.observe(dom)
  }

  $: if (dom) intersectionObserver.observe(dom)

  let loadIconY: number = 0
  let loadIconYMove: number = 0
  let isScrollToTop: boolean = false

  $: offsetY = Math.max(Math.min((loadIconYMove - loadIconY) / 2, 100), 0)

  $: isPC = $chatEnv.device === 'pc'

  const onTouchstart = (e: TouchEvent) => {
    isScrollToTop = (isWindow ? window.scrollY : root.scrollTop) === 0
    if (!canLoadmore) return

    loadIconY = e.touches[0].clientY
    loadIconYMove = e.touches[0].clientY

    controlledRoot && (controlledRoot.style.overscrollBehavior = 'none')
    // trick for ios
    // make overscroll-behavior property works by letting it overflow and scrollable
    if (isIOS && !isWindow) controlledRoot.style.minHeight = '100.3%'
  }

  const onTouchmove = (e: TouchEvent) => {
    if (!canLoadmore || !isScrollToTop) return

    loadIconYMove = e.touches[0].clientY

    if (offsetY < 0 && controlledRoot.style.overscrollBehavior) {
      controlledRoot.style.overscrollBehavior = null

      if (isIOS && !isWindow) controlledRoot.style.minHeight = null
    }
  }

  const onTouchend = () => {
    if (controlledRoot.style.overscrollBehavior) {
      controlledRoot.style.overscrollBehavior = null

      if (isIOS && !isWindow) controlledRoot.style.minHeight = null
    }

    if (offsetY >= 50) dispatch('fetchMore')

    loadIconY = 0
    loadIconYMove = 0
  }
</script>

<svelte:window on:touchstart={!isPC && onTouchstart} on:touchend={!isPC && onTouchend} on:touchmove={!isPC && onTouchmove} />

<div class="w-full flex justify-center">
  {#if loading}
    <div class=" flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]">
      <div class="text-[12px] text-imprimary">{$t('chat.loading')}</div>
      <div class="relative w-[16px] h-[16px] ml-[8px]">
        <Circle stroke="rgb(var(--im-monorepo-primary))" />
      </div>
    </div>
  {:else if isPC}
    <Ripple class="flex items-center justify-center z-10 cursor-pointer" on:click={() => dispatch('fetchMore')}>
      <div class="bg-white rounded-[10px]">
        <div class="flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]">
          <div class="text-[12px] text-imprimary">{$t('chat.clickToMore')}</div>
        </div>
      </div>
    </Ripple>
  {:else}
    <div class="flex items-center justify-center z-10" bind:this={dom}>
      <div class="bg-white rounded-[10px]" style:transform={`translateY(${offsetY}px)`}>
        <div class="flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]">
          <div class="text-[12px] text-imprimary">{$t('chat.dropToMore')}</div>
          <DoubleArrow width={16} height={16} fill="rgb(var(--im-monorepo-primary))" />
        </div>
      </div>
    </div>
  {/if}
</div>
