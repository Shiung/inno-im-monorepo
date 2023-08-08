<script lang="ts">
  import AnchorLoading from './Anchor/Loading.svelte'
</script>
<div class='grid grid-cols-2 gap-[12px] p-[16px]'>
  {#each { length: 4 } as _}
    <AnchorLoading />
  {/each}
</div>
