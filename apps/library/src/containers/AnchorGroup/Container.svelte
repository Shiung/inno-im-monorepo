<script lang='ts'>
  import { twMerge } from "tailwind-merge";
</script>


<div class={twMerge('flex overflow-x-auto space-x-3 scrollbox', $$props.class)} data-id='anchorGroup-container'>
  <slot />
</div>

<style lang="scss">
  .scrollbox {
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>