<script lang="ts">
  import { t } from '$stores'

  import Title from '$src/components/Title/index.svelte'

  import LineChart from './components/LineChart/index.svelte'
  import Loading from './components/Loading/index.svelte'

  import type { StatisticsList } from '../type'
  import { calculateRecordData } from './utils'

  export let data: StatisticsList
  export let loading: boolean

  $: chartData = calculateRecordData(data)
</script>

<div class="px-4">
  <Title>{$t('expert.statistics.hitRecord')}</Title>
</div>

{#if loading}
  <Loading />
{:else if chartData.length}
  <LineChart chartData={chartData} />
{/if}