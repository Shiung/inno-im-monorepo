<script lang="ts">
  import { t } from '$stores'
  import type { StatisticsInfo } from '$src/pages/expertDetail/Main/Statistics/RecentlyStatistics/type'
  
  export let data: StatisticsInfo['type']

  const mapping: { [k in StatisticsInfo['type']]: string } = {
    1: 'week',
    2: 'month',
    3: 'season'
  }
</script>

<div
  class="rounded-[4px] flex justify-center items-center px-[9px] py-[1px]"
  style="background: linear-gradient(90deg, #4C9EEA 0%, #50BDFF 100%);"
>
  <span class="text-white font-semibold text-[10px] leading-[15px]">{ data && $t(`expert.statistics.${mapping[data]}`) }</span>
</div>