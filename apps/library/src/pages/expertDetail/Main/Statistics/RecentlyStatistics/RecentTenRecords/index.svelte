<script lang="ts">
  import { t } from '$stores'

  import Title from '$src/components/Title/index.svelte'

  import Loading from './components/Loading/index.svelte'
  import SubTitleItem from './components/SubTitleItem/index.svelte'

  import type { StatisticsList } from '../type'

  export let loading: boolean
  export let data: StatisticsList
</script>

<div class="flex items-center justify-between px-4">
  <Title>{$t('expert.statistics.recentRecord', { num: 10 })}</Title>

  <div class="flex space-x-3">
    <SubTitleItem title={$t('expert.statistics.hit')} color={'rgba(var(--im-monorepo-primary))'} />
    <SubTitleItem title={$t('expert.statistics.none')} color={'#ddd'} />
  </div>
</div>

{#if loading}
  <Loading />
{:else if data.length}
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
{/if}