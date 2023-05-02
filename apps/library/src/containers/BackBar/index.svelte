<script lang='ts'>
import { pop } from 'svelte-spa-router'
import { Ripple } from 'ui'
import ArrowLeft from './images/arrow_left.svg'

export let title: string = ''
let dom: HTMLDivElement

$: blockHeight = dom?.getBoundingClientRect() ? `${dom.getBoundingClientRect().height}px` : '0px'
</script>

<div data-cid='BackBar'>
  <div class='fixed w-full h-[44px] flex items-center bg-white' bind:this={dom}>
    <div class='absolute w-full text-center'> {title} </div>
    <Ripple class='rounded-full p-[5px] ml-[8px]' on:click={pop}>
      <ArrowLeft width={20} height={20} />
    </Ripple>
  </div>
  <div style:height={blockHeight} />
</div>
