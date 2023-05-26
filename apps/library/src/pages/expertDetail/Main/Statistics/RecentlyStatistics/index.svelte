<script lang='ts'>
  import { im } from 'api'
  import { t } from '$stores'
  import { params } from 'svelte-spa-router'

  import Title from '$src/components/Title/index.svelte'

  import WMSStatistics from './WMSStatistics/index.svelte'
  import WMSStatisticsLoading from './WMSStatistics/components/Loading/index.svelte'

  import HittingRecord from './HittingRecord/index.svelte'
  import HittingRecordLoading from './HittingRecord/components/Loading/index.svelte'

  import RecentTenRecords from './RecentTenRecords/index.svelte'
  import RecentTenRecordsLoading from './RecentTenRecords/components/Loading/index.svelte'
  import SubTitleItem from './RecentTenRecords/components/SubTitleItem/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: $params?.expertId } })
</script>

<div>
  {#await promise}
    <WMSStatisticsLoading />
  {:then statisticData} 
    <WMSStatistics data={statisticData?.data?.info || []} />
  {/await}

  <div class="px-4">
    <Title>{$t('expert.statistics.hitRecord')}</Title>
  </div>
  
  {#await promise}
    <HittingRecordLoading />
  {:then statisticData}
    <HittingRecord data={statisticData?.data?.list || []} />
  {/await}
  
  <div class="flex items-center justify-between px-4">
    <Title>{$t('expert.statistics.recentRecord', { num: 10 })}</Title>

    <div class="flex space-x-3">
      <SubTitleItem title={$t('expert.statistics.hit')} color={'rgba(var(--im-monorepo-primary))'} />
      <SubTitleItem title={$t('expert.statistics.none')} color={'#ddd'} />
    </div>
  </div>

  {#await promise}
    <RecentTenRecordsLoading />
  {:then statisticData}
    <RecentTenRecords data={statisticData?.data?.list || []} />
  {/await}
</div>
