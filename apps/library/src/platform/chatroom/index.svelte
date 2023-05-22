<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Chatroom, { setChatEnv } from '$src/containers/Chatroom'

const isWindow: boolean = true
let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height

setChatEnv({
  displayType: isWindow ? 'window' : 'block',
  height: dom?.getBoundingClientRect().height,
  minimize: false 
})

</script>

<div>
  <div class={twMerge('w-full bg-white h-[200px] z-30', isWindow && 'fixed')} bind:this={dom}> 
    this platform area
  </div>
  <div style:height={isWindow ? `${blockHeight}px` : ''}/>
</div>

<Chatroom />
