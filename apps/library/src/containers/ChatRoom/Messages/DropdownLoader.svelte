<script lang='ts'>
import { t } from '$stores'
import Circle from 'ui/core/button/loading.svelte'

import DoubleArrow from '../images/double_arrow_down_small.svg'

let dom: HTMLDivElement
const intersectionObserver = new IntersectionObserver(async entries => {
  for (const entry of entries) {
    if (entry.intersectionRatio <= 0) return

    // const targetId = $chatMessages[pastQuantity].id
    // const targetDom = document.querySelector(`div[data-id='${targetId}']`)

    // const res = await im.chatroomPastMessage({ query: { roomId, quantity: pastQuantity }})
    // chatMessages.update(messages => [...res.data.list, ...messages])

    // targetDom.scrollIntoView()
    // dom.scrollTo({ top: dom.scrollTop - loadDom.clientHeight - 10 })
  }
})

$: if (dom) intersectionObserver.observe(dom)

const onTouchstart = (e: Event) => {
  console.log('touchstart', e)
}

const onTouchmove = (e: Event) => {
  console.log('touchmove', e)
}

const onTouchend = (e: Event) => {
  console.log('touchend', e)
  }
</script>

<svelte:window 
  on:touchstart={onTouchstart} 
  on:touchend={onTouchend}
  on:touchmove={onTouchmove}
/>


<div class='flex items-center justify-center' bind:this={dom}>
  <div class='flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]'>
    <div class='text-[12px] text-imprimary'> {$t('chat.dropToMore', { num: 10 })} </div>
    <DoubleArrow width={16} height={16} fill='rgb(var(--im-monorepo-primary))' />
  </div>
</div>
