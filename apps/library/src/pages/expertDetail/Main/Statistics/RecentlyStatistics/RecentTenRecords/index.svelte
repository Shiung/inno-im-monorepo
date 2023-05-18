<script lang="ts">
  import type { StatisticsList } from '../type'
  export let data: StatisticsList
</script>

<div data-cid='RecentTenRecords' class="px-4 py-[14px]">
  <div class="w-full flex justify-between relative z-[1]">
    <div class="w-full h-[2px] bg-[#eeeeee] absolute top-1/2 -translate-y-1/2 z-[-1]"></div>

    {#each data as item}
      <div
        class="w-4 h-4 rounded-full flex-none"
        style:background-color="{item?.hitStatus === 1 ? 'rgba(var(--im-monorepo-primary))' : '#DDD'}">
      </div>
    {/each}
  </div>
</div>