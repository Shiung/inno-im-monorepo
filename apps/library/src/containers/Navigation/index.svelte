<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { setNavi, type INavigation } from './context'

  export let active: INavigation['active']
  export let shape: INavigation['shape'] = 'rounded'
  let container: HTMLDivElement

  $: setNavi({ active, shape })

  $: containerHeight = container && container.getBoundingClientRect().height
</script>

<div data-cid="Navigation">
  <div bind:this={container} class={twMerge('flex w-full h-[44px] bg-white z-10 im-shadow fixed items-center px-[10px]', $$props.class)}>
    <slot />
  </div>

  <div style:height={`${containerHeight}px`} />
</div>
