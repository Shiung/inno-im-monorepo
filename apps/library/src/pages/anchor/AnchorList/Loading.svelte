<script lang='ts'>
  import AnchorLoading from './Anchor/Loading.svelte'
</script>

{#each { length: 10 } as _}
  <AnchorLoading />
{/each}
