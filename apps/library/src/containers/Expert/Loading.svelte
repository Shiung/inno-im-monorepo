<script lang="ts">
  export let length: number = 1
</script>

{#if length === 1}
  <div class='animate-pulse bg-[#eeeeee] h-[90px] rounded-[20px]' />
{:else if length > 1}
  <div class='p-[20px] space-y-10'>
    {#each { length } as _}
      <div class='animate-pulse bg-[#eeeeee] h-[90px] rounded-[20px]' />
    {/each}
  </div>
{/if}