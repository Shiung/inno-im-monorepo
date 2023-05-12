<script lang="ts">
  import type { StatisticsLists } from '../types'
  import { calculateRecordData } from './utils'
	import LineChart from './components/LineChart/index.svelte'
  export let data: StatisticsLists

  $: chartData = calculateRecordData(data)

  const lineChartOptions = {
    containerWidth: 375,
    containerHeight: 190,
    marginLeft: 46,
    marginRight: 16,
    marginTop: 10,
    marginBottom: 30
  }

</script>

<LineChart
  cid="LineChart"
  chartOptions={lineChartOptions}
  chartData={chartData}
/>