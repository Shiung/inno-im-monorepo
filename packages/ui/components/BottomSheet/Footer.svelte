<script lang='ts'>
import { twMerge } from 'tailwind-merge'
let dom: HTMLDivElement

$: blockHeignt = `${dom?.offsetHeight || 0}px`
</script>

<div>
  <div class={twMerge('p-2', $$props.class, 'w-full absolute bottom-0')} bind:this={dom}>
    <slot />
  </div>
  <div style:height={blockHeignt} />
</div>
