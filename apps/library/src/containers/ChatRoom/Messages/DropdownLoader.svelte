<script lang='ts'>
import { t } from '$stores'
import Circle from 'ui/core/button/loading.svelte'

import DoubleArrow from '../images/double_arrow_down_small.svg'

export let root: HTMLDivElement
export let roomId: number

let dom: HTMLDivElement
let canLoadmore: boolean
const intersectionObserver = new IntersectionObserver(async entries => {
  for (const entry of entries) {
    // if (entry.intersectionRatio <= 0) return
    canLoadmore = entry.isIntersecting

    // const targetId = $chatMessages[pastQuantity].id
    // const targetDom = document.querySelector(`div[data-id='${targetId}']`)

    // const res = await im.chatroomPastMessage({ query: { roomId, quantity: pastQuantity }})
    // chatMessages.update(messages => [...res.data.list, ...messages])

    // targetDom.scrollIntoView()
    // dom.scrollTo({ top: dom.scrollTop - loadDom.clientHeight - 10 })
  }
}, {
  root,
  rootMargin: '-70px 0px 0px 0px'
})

$: if (dom) intersectionObserver.observe(dom)

let loadIconY: number = 0

const onTouchstart = (e: TouchEvent) => {
  if (!canLoadmore) return
  document.body.style.overflow = 'hidden'
}

const onTouchmove = (e: TouchEvent) => {
  if (!canLoadmore) return
  console.log('touchmove', e, e.touches[0].clientX, e.touches[0].clientY)
  console.log('client', e.touches[0].clientX, e.touches[0].clientY)
  console.log('page', e.touches[0].pageX, e.touches[0].pageY)
  console.log('radius', e.touches[0].radiusX, e.touches[0].radiusY)
}

const onTouchend = (e: TouchEvent) => {
  // if (!canLoadmore) return
  if (document.body.style.overflow) document.body.style.overflow = null
  // if (html.style.touchAction) html.style.touchAction = null
  console.log('touchend', e)
  }
</script>

<svelte:window
  on:touchstart={onTouchstart} 
  on:touchend={onTouchend}
  on:touchmove={onTouchmove}
/>


<div class='w-full flex justify-center'>
  <div class='absolute flex justify-center' style:transform={`translateY(${loadIconY}px)`}>
    <div class='w-[20px] h-[20px] bg-[#333] rounded-full' />
  </div>

  <div class='flex items-center justify-center' bind:this={dom}>
    <div class='flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]'>
      <div class='text-[12px] text-imprimary'> {$t('chat.dropToMore', { num: 10 })} </div>
      <DoubleArrow width={16} height={16} fill='rgb(var(--im-monorepo-primary))' />
    </div>
  </div>
</div>
