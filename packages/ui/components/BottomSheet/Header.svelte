<script lang='ts'>
import { twMerge } from 'tailwind-merge'

export let title: string = ''
let dom: HTMLDivElement

$: blockHeignt = `${dom?.offsetHeight || 0}px`
</script>

<div data-cid='BottomSheet_Header' class='flex flex-col'>
  <div class={twMerge('px-2', $$props.class, 'w-full absolute')} bind:this={dom}>
    {#if title}
      <div class='absolute w-full text-center pointer-events-none'> {title} </div>
    {/if}
    <slot />
  </div>
  <div style:height={blockHeignt} />
</div>
