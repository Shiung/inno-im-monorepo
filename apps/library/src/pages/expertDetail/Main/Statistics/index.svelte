<script lang='ts'>
  import { im } from 'api'
  import WMSStatistics from './WMSStatistics/index.svelte'
  import HittingRecord from './HittingRecord/index.svelte'
  import RecentlyHitting from './RecentlyHitting/index.svelte'

  const promise = im.expertStatistics({ query: { expertId: '1234' } })
</script>

<div>
  {#await promise}
    Loading...
  {:then statisticData} 
    <WMSStatistics infos={statisticData.data.info} />
    <!-- <HittingRecord data={statisticData.data.list} /> -->
  {/await}
  <RecentlyHitting />
</div>
