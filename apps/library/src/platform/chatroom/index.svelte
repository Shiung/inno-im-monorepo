<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Chatroom from '$src/containers/Chatroom'

const fixed: boolean = true
let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height
</script>

<div>
  <div class={twMerge('w-full bg-white h-[200px] z-30', fixed && 'fixed')} bind:this={dom}> 
    this platform area
  </div>

  <div style:height={fixed ? `${blockHeight}px` : ''}/>
</div>

<Chatroom height={200} {fixed} />
