<script lang='ts'>
  import AnchorLoading from './Anchor/Loading.svelte'
</script>

<div class='grid grid-cols-2 gap-3'>
  {#each { length: 8 } as _}
    <AnchorLoading />
  {/each}
</div>
