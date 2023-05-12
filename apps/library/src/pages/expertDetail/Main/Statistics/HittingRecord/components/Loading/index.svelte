<script lang="ts">
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import { t } from '$stores'
</script>

<div class="mx-4">
  <Title>{$t('expert.statistics.hitRecord')}</Title>

  <div class="rounded-[8px] animate-pulse h-[200px] bg-[#eeeeee]"></div>
</div>