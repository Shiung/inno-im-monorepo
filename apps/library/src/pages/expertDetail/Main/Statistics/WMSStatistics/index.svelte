<script lang="ts">
  import type { IExpertStatistics } from 'api/im/types'
  import Slider from './Slider/index.svelte'
  import StatsBlock from './StatsBlock/index.svelte'

  export let infos: IExpertStatistics['res']['data']['info'] = []
</script>

<Slider data={infos} let:item={item}>
  <StatsBlock info={item} />
</Slider>