<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'
  import ExpertList, { Loading as ExpertListLoading } from '$containers/ExpertList'

  import ArticleStoryLoading from './ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

  let detailPromise: ReturnType<typeof im.expertArticleDetail>
  let othersPromise: ReturnType<typeof im.expertMatchArticle>

  const fetchArticleDetail = async (articleId: string) => {
    detailPromise = im.expertArticleDetail({ query: { articleId }})
      .then(response => {
        const matchId = response?.data?.mid
        if (matchId) othersPromise = im.expertMatchArticle({ query: { matchId }})

        return response
      })
  }

  $: fetchArticleDetail($params?.articleId)
</script>

<div class='space-y-3'>
  <div>
    {#await detailPromise}
      <ArticleStoryLoading />
    {:then detail}
      <ArticleStory data={detail?.data} />
    {/await}
    <Info />
  </div>

  <div class='rounded-[20px] bg-white'>
    <div class="px-4"><Title>{$t('expert.planDetail.recommendMatches')}</Title></div>
    
    {#await detailPromise}
      <MatchPanelLoading />
    {:then detail}
      <MatchPanel data={detail?.data} />
    {/await}

    <div class='px-4'><Title>{$t('expert.planDetail.planAnalysis')}</Title></div>

    {#await detailPromise}
      <PlanAnalysisLoading />
    {:then detail}
      <PlanAnalysis data={detail?.data} />
    {/await}
  </div>

  <div class='rounded-t-[20px] bg-white'>
    <div class='px-4'><Title>{$t('expert.planDetail.othersPrediction')}</Title></div>

    {#await othersPromise}
      <ExpertListLoading />
    {:then response}
      <ExpertList list={response?.data?.list || []} />
    {/await}
  </div>
</div>