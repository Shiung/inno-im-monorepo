<div class='flex-1 w-full space-y-[12px] px-[12px] overflow-y-scroll bg-white relative'>
  {#each { length: 5} as _}
    <div class='flex w-full'>
      <div class='rounded-full min-w-[30px] h-[30px] animate-pulse bg-[#999]' />
      <div class='w-full h-[100px] ml-[8px] rounded-[20px] animate-pulse bg-[#999]' />
    </div>
  {/each}
</div>
