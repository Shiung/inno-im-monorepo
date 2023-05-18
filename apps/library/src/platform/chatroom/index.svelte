<script lang='ts'>
import Chatroom from '$src/containers/Chatroom'

let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height
</script>

<div>
  <div class='fixed w-full bg-white h-[200px] z-30' bind:this={dom}> this platform area </div>
  <div style:height={`${blockHeight}px`}/>
</div>

<Chatroom height={200} />
