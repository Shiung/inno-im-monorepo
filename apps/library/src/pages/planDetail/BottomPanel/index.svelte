<script lang="ts">
  let dom: HTMLDivElement
  $: height = (dom?.getBoundingClientRect() && `${dom?.getBoundingClientRect()?.height}px`) || `0px`
</script>

<div data-cid="DetailBottomPanel">
  <div bind:this={dom} class="fixed z-10 bottom-0 left-0 right-0">
    <div class="p-4 rounded-t-[20px] im-shadow bg-white">
      <slot />
    </div>
  </div>
  <div style:height />
</div>
