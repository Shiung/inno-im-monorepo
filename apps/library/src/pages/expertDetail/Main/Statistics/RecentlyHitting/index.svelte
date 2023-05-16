<script lang="ts">
  import { params } from 'svelte-spa-router'
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import ArticleList, {Loading} from '$src/containers/ArticleList'
  import { t } from '$stores'
  import { im } from 'api'

  const promise = im.expertArticleHit({ query: { expertId: $params.expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div class="px-4">
  <Title> {$t('expert.plan.history')} </Title>
</div>

<div class="px-3 mb-3">
  {#await promise}
    <Loading />
  {:then articles}
    <ArticleList articles={articles?.data?.list} />
  {/await}
</div>