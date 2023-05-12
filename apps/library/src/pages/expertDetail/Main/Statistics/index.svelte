<script lang='ts'>
  import { im } from 'api'

  import WMSStatistics from './WMSStatistics/index.svelte'
  import WMSStatisticsLoading from './WMSStatistics/components/Loading/index.svelte'

  import HittingRecord from './HittingRecord/index.svelte'
  import HittingRecordLoading from './HittingRecord/components/Loading/index.svelte'

  import RecentTenRecords from './RecentTenRecords/index.svelte'

  import RecentlyHitting from './RecentlyHitting/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: '1234' } })
</script>

{#await promise}
  <WMSStatisticsLoading />

  <HittingRecordLoading />
{:then statisticData} 
  <WMSStatistics infos={statisticData.data.info} />
  
  <HittingRecord data={statisticData.data.list} />

  <RecentTenRecords />

  <RecentlyHitting />
{/await}
