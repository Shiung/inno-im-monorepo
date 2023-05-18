<script lang="ts">
  import type { StatisticsList } from '../type'
  import { calculateRecordData } from './utils'
	import LineChart from './components/LineChart/index.svelte'
  export let data: StatisticsList

  $: chartData = calculateRecordData(data)

</script>

<LineChart chartData={chartData} />