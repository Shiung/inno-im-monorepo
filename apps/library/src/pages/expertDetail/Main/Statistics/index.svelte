<script lang='ts'>
  import { im } from 'api'
  import WMSStatistics from './WMSStatistics/index.svelte'
  import { SliderLoading as WMSStatisticsLoading } from './WMSStatistics/components/Slider'
  import HittingRecord from './HittingRecord/index.svelte'
  // import RecentlyHitting from './RecentlyHitting/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: '1234' } })
</script>

{#await promise}
  <WMSStatisticsLoading />
{:then statisticData} 
  <WMSStatistics infos={statisticData.data.info} />
  
  <HittingRecord data={statisticData.data.list} />

  <!-- <RecentlyHitting /> -->
{/await}
