<script lang="ts">
  import type { IExpertStatistics } from 'api/im/types'
  import { Slider } from 'ui'
  import Loading from './components/Loading/index.svelte'
  import StatsBlock from './components/StatsBlock/index.svelte'

  export let loading: boolean
  export let data: IExpertStatistics['res']['data']['info'] = []
</script>

{#if loading}
  <Loading />
{:else}
  <Slider data={data} let:item={item} height={70} needSlide={data.length > 1}>
    <StatsBlock info={item} />
  </Slider>
{/if}