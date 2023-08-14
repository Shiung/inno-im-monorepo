<script lang='ts'>
  import { twMerge } from 'tailwind-merge'
  import AnchorLoading from './Anchor/Loading.svelte'

  export let size: number = 8
</script>

<div class={twMerge('grid grid-cols-2 gap-3', $$props.class)}>
  {#each { length: size } as _}
    <AnchorLoading />
  {/each}
</div>
