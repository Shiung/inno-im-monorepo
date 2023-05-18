<script lang="ts">
  import { params } from 'svelte-spa-router'
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import List from './components/List.svelte'
  import Loading from './components/Loading.svelte'
  import { t } from '$stores'
  import { im } from 'api'

  const promise = im.expertArticleHit({ query: { expertId: $params?.expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div class="px-4">
  <Title> {$t('expert.statistics.recentHitRecord')} </Title>
</div>

<div class="px-3 mb-3">
  {#await promise}
    <Loading />
  {:then articles}
    <List articles={articles?.data?.list || []} />
  {/await}
</div>