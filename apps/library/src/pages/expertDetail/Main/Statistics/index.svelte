<script lang='ts'>
  import { im } from 'api'
  import WMSStatistics from './WMSStatistics/index.svelte'
  import { SliderLoading } from './WMSStatistics/Slider'
  // import HittingRecord from './HittingRecord/index.svelte'
  import RecentlyHitting from './RecentlyHitting/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: '1234' } })
</script>

{#await promise}
  <SliderLoading />
{:then statisticData} 
  <WMSStatistics infos={statisticData.data.info} />
  
  <!-- <HittingRecord data={statisticData.data.list} /> -->

{/await}
<RecentlyHitting />
