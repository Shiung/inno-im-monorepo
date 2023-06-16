<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Chatroom, { setChatEnv, onSizeChangedCallback, type SizeChangedOption } from '$src/containers/Chatroom'

const isWindow: boolean = true
let expandType: string = 'default'
let dom: HTMLDivElement
let changedHeight
let videoPlay: boolean = false
let isTransition: boolean = false

$: initHeight = dom?.getBoundingClientRect().height

$: changedHeight = initHeight

$: if (dom) {
  setChatEnv({
    displayType: isWindow ? 'window' : 'block',
    height: initHeight,
    minimize: true
  })
}

$: setChatEnv({ height: changedHeight })

onSizeChangedCallback((option: SizeChangedOption) => {
  isTransition = option.transition

  switch(option.size) {
    case 'default':
      expandType = 'default'
      break
    case 'normal':
      expandType = 'normal'
      changedHeight = initHeight
      break
    case 'expand':
      if(videoPlay) return
      expandType = 'expand'
      changedHeight = 0
      break
  }
})

// setTimeout(() => {
//   videoPlay = true
// }, 3000)
</script>

<div>
  <div
    class={twMerge(
      'w-full bg-white h-[200px] duration-300 ease-in-out',
      (expandType !== 'default') && 'fixed z-30',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    bind:this={dom}
    style:height={expandType !== 'default' ? `${changedHeight}px` : ''}
    style:overflow={!isWindow ? 'hidden' : ''}
  >
    this platform area
  </div>
  <div
    class={twMerge(
      'duration-300 ease-in-out',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    style:height={(expandType !== 'default') ? `${changedHeight}px` : ''}
  />

  <div
    class={twMerge(
      'h-[2000px] bg-red-500',
      (expandType !== 'default') ? 'fixed left-0 right-0' : 'static'
    )}
  />
</div>

<Chatroom />
