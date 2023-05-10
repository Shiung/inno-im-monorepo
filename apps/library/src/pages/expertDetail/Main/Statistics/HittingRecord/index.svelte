<script lang="ts">
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import { t } from '$stores'
  import type { StatisticsLists } from '../types'

  export let data: StatisticsLists
</script>

<div>
  <div class="px-4">
    <Title>{$t('expert.statistics.hitRecord')}</Title>
  </div>

  
</div>