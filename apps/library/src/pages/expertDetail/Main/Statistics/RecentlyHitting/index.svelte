<script lang="ts">
  import { params } from 'svelte-spa-router'
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import Loading from './components/Loading/index.svelte'
  import { t } from '$stores'
  import ExpertArticle from '../../components/ExpertArticle/index.svelte'
  import { im } from 'api'

  const promise = im.expertArticleHit({ query: { expertId: $params.expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div class="px-4">
  <Title> {$t('expert.plan.history')} </Title>
</div>

<div class="px-3">
  {#await promise}
    <Loading />
  {:then articles}
    <ExpertArticle data={articles?.data?.list} />
  {/await}
</div>