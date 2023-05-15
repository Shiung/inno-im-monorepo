<script lang='ts'>
  import { im } from 'api'
  import { t } from '$stores'

  import Title from '$pages/expertDetail/Main/components/Title.svelte'

  import WMSStatistics from './WMSStatistics/index.svelte'
  import WMSStatisticsLoading from './WMSStatistics/components/Loading/index.svelte'

  import HittingRecord from './HittingRecord/index.svelte'
  import HittingRecordLoading from './HittingRecord/components/Loading/index.svelte'

  import RecentTenRecords from './RecentTenRecords/index.svelte'
  import RecentTenRecordsLoading from './RecentTenRecords/components/Loading/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: '1234' } })
</script>

<div>
  {#await promise}
    <WMSStatisticsLoading />
  {:then statisticData} 
    <WMSStatistics data={statisticData.data.info} />
  {/await}

  <div class="px-4">
    <Title>{$t('expert.statistics.hitRecord')}</Title>
  </div>
  
  {#await promise}
    <HittingRecordLoading />
  {:then statisticData}
    <HittingRecord data={statisticData.data.list} />
  {/await}
  
  <div class="px-4">
    <Title>{$t('expert.statistics.recentRecord', { num: 10 })}</Title>
  </div>

  {#await promise}
    <RecentTenRecordsLoading />
  {:then statisticData}
    <RecentTenRecords />
  {/await}
</div>
