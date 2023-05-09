<script lang="ts">
  import { t } from '$stores'
  import type { IExpertStatistics } from 'api/im/types'
  import { amountThousandthTransformer } from 'utils/amount'
  import InfoText from './components/InfoText.svelte'

  type ArrayElement<T extends any[]> = T extends readonly (infer Element)[] ? Element : T
  type StatisticsInfo = ArrayElement<IExpertStatistics['res']['data']['info']>
  export let info: StatisticsInfo
  
  const mapping: { [k in StatisticsInfo['type']]: string } = {
    1: 'week',
    2: 'month',
    3: 'season'
  }
</script>

<div class="relative inline-block w-full h-full rounded-[10px] bg-white shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
  <div class="absolute top-0 left-0">
    <div
      class="rounded-[4px] flex justify-center items-center"
      style="background: linear-gradient(90deg, #4C9EEA 0%, #50BDFF 100%);"
    >
      <span class="text-white font-semibold leading-[15px]">{ info.type && $t(`expert.statistics.${mapping[info.type]}`) }</span>
    </div>
  </div>
  <div class="w-[67.2%] flex justify-evenly items-center">
    <InfoText data={amountThousandthTransformer(info.hotStreak)} type={$t('expert.statistics.hotStreak')} />
    <InfoText data={amountThousandthTransformer(info.hitRate, { decimal: 2 }) + '%'} type={$t('expert.statistics.hitRate')} />
  </div>
</div>