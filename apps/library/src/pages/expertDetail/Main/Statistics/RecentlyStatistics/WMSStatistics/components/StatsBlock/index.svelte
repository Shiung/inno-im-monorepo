<script lang="ts">
  import { t } from '$stores'
  import { amountThousandthTransformer } from 'utils/amount'
  import type { StatisticsInfo } from '$src/pages/expertDetail/Main/Statistics/RecentlyStatistics/type'
  import InfoText from './InfoText.svelte'
  import PeriodLabel from './PeriodLabel.svelte'

  export let info: StatisticsInfo
</script>

<div class="relative inline-flex items-center justify-center w-full h-[63px] rounded-[10px] bg-white im-shadow">
  <div class="absolute top-0 left-0">
    <PeriodLabel data={info.type} />
  </div>
  <div class="w-[67.2%] flex justify-evenly items-center">
    <InfoText data={amountThousandthTransformer(info.hotStreak)} type={$t('expert.statistics.hotStreak')} />
    <InfoText data={amountThousandthTransformer(info.hitRate, { decimal: 2 }) + '%'} type={$t('expert.statistics.hitRate')} />
  </div>
</div>