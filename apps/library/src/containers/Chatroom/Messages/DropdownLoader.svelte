<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { getMobileOSInfo, MobileOS } from 'utils'
import { t } from '$stores'

import Circle from 'ui/core/button/loading.svelte'

import DoubleArrow from '../images/double_arrow_down_small.svg'

const dispatch = createEventDispatcher()

export let root: HTMLDivElement
export let loading: boolean
export let quantity: number = 10

let dom: HTMLDivElement
let canLoadmore: boolean

const isIOS = getMobileOSInfo() === MobileOS.iOS
const styledElement = isIOS ? document.documentElement : document.body

const intersectionObserver = new IntersectionObserver(async entries => {
  for (const entry of entries) {
    canLoadmore = entry.isIntersecting
  }
}, { root, rootMargin: `0px 0px 0px 0px` })

$: if (dom) intersectionObserver.observe(dom)

let loadIconY: number = 0
let loadIconYMove: number = 0
$: offsetY = Math.min((loadIconYMove - loadIconY) / 2, 100)

const onTouchstart = (e: TouchEvent) => {
  if (!canLoadmore) return

  loadIconY = e.touches[0].clientY
  loadIconYMove = e.touches[0].clientY

  styledElement && (styledElement.style.overscrollBehavior = 'none')
}

const onTouchmove = (e: TouchEvent) => {
  if (!canLoadmore) return

  loadIconYMove = e.touches[0].clientY

  if (offsetY < 0 && styledElement.style.overscrollBehavior) {
    styledElement.style.overscrollBehavior = null
  }
}

const onTouchend = () => {
  if (styledElement.style.overscrollBehavior) {
    styledElement.style.overscrollBehavior = null
  }

  if (offsetY >= 50) dispatch('fetchMore')

  loadIconY = 0
  loadIconYMove = 0
}
</script>

<svelte:window
  on:touchstart={onTouchstart} 
  on:touchend={onTouchend}
  on:touchmove={onTouchmove}
/>


<div class='w-full flex justify-center'>
  {#if loading}
    <div class=' flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]'>
      <div class='text-[12px] text-imprimary'> {$t('chat.loading')} </div>
      <div class='relative w-[16px] h-[16px] ml-[8px]'>
        <Circle stroke='rgb(var(--im-monorepo-primary))' />
      </div>
    </div>
  {:else}

  <div class='flex items-center justify-center z-10' bind:this={dom}>
    <div class='bg-white rounded-[10px]' style:transform={`translateY(${offsetY}px)`} >
      <div class='flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]' >
        <div class='text-[12px] text-imprimary'> {$t('chat.dropToMore', { num: quantity })} </div>
        <DoubleArrow width={16} height={16} fill='rgb(var(--im-monorepo-primary))' />
      </div>
    </div>
  </div>
  {/if}
</div>
