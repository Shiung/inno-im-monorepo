<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Chatroom, { setChatEnv } from '$src/containers/Chatroom'

const isWindow: boolean = false
let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height

$: if (dom) setChatEnv({
  displayType: isWindow ? 'window' : 'block',
  height: blockHeight,
  minimize: false,
  showBetList: false,
  device: 'pc'
})

</script>

<div>
  <div class={twMerge('w-full bg-white h-[200px] z-30', isWindow && 'fixed')} bind:this={dom}> 
    this platform area
  </div>
  <div style:height={isWindow ? `${blockHeight}px` : ''}/>
</div>

<div class={twMerge(isWindow && 'fixed w-full')}>
  <Chatroom />
</div>
