<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { setNavi } from './context'

  export let active: string | number
  let container: HTMLDivElement

  $: setNavi({ active })

  $: containerHeight = container && container.getBoundingClientRect().height
</script>

<div>
  <div bind:this={container} class={twMerge('flex w-full h-[44px] bg-white z-10 im-shadow fixed items-center px-[10px]', $$props.class)}>
    <slot />
  </div>

  <div style:height={`${containerHeight}px`} />
</div>
