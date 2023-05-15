<script lang="ts">
  import type { IExpertStatistics } from 'api/im/types'
  import Slider from './components/Slider/index.svelte'
  import StatsBlock from './components/StatsBlock/index.svelte'

  export let data: IExpertStatistics['res']['data']['info'] = []
</script>

<Slider data={data} let:item={item}>
  <StatsBlock info={item} />
</Slider>