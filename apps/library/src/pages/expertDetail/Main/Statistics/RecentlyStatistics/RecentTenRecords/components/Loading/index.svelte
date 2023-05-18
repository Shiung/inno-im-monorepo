<div data-cid='RecentTenRecords' class="px-4 py-[14px]">
  <div class="animate-pulse w-full flex justify-between relative z-[1]">
    <div class="w-full h-[2px] bg-[#eeeeee] absolute top-1/2 -translate-y-1/2 z-[-1]"></div>

    {#each Array.from({ length: 10 }) as _}
      <div class="w-4 h-4 bg-[#eeeeee] rounded-full flex-none"></div>
    {/each}
  </div>
</div>