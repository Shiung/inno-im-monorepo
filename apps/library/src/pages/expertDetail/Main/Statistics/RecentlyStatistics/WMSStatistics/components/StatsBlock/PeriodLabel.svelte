<script lang="ts">
  import { t } from '$stores'
  import { Badget } from 'ui'
  import type { StatisticsInfo } from '$src/pages/expertDetail/Main/Statistics/RecentlyStatistics/type'
  
  export let data: StatisticsInfo['type']

  const mapping: { [k in StatisticsInfo['type']]: string } = {
    1: 'week',
    2: 'month',
    3: 'season'
  }
</script>

{#if data}
  <Badget class='px-[9px] py-[1px]'>
    <span class="text-white font-semibold leading-[15px]">{$t(`expert.statistics.${mapping[data]}`)}</span>
  </Badget>
{/if}