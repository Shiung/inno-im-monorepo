<script lang='ts'>
import BScroll from '@better-scroll/core'
import { onDestroy } from 'svelte'
import { twMerge } from 'tailwind-merge'

import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'

let dom: HTMLDivElement
let bs: BScrollConstructor
let timeout: ReturnType<typeof setTimeout>

const ro = new ResizeObserver(_entries => {
  if (timeout) clearTimeout(timeout)
  const target = _entries[0].target as HTMLElement

  timeout = setTimeout(() => {
    if (bs) bs.destroy()
    bs = new BScroll(target, {
      probeType: 2,
      click: true
    })
  }, 150)
})

const bindBScroll = (_dom: HTMLDivElement) => {
  if (!_dom) return
  if (bs) return

  ro.observe(_dom)
}

$: bindBScroll(dom)

onDestroy(() => {
  bs.destroy()
})


</script>

<div bind:this={dom} class='flex-1 overflow-hidden'>
  <div class={twMerge('px-2', $$props.class, 'flex flex-col')}>
    <slot />
  </div>
</div>
