<script lang="ts">
  import { setContext } from 'svelte'
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'
  import ExpertList, { Loading as ExpertListLoading } from '$containers/ExpertList'
  import BackBar from '$containers/BackBar'
  import BonusPoint from '$containers/HeaderNavigation/BonusPoint/index.svelte'

  import ArticleStoryLoading from './ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

  import BottomPanel from './BottomPanel/index.svelte'
  
  import { isPastContextKey } from './context'

  let coin: number = 1500
  let detailPromise: ReturnType<typeof im.expertArticleDetail>
  let othersPromise: ReturnType<typeof im.expertMatchArticle>
  let bonus: number = 100000
  let isPast: boolean = false

  const fetchArticleDetail = async (articleId: string) => {
    detailPromise = im.expertArticleDetail({ query: { articleId }})
      .then(response => {
        const { mid: matchId, past } = response?.data
        if (matchId) othersPromise = im.expertMatchArticle({ query: { matchId }})
        if (past) isPast = true
        return response
      })
  }

  const onButtonClick = () => {
    console.log('onButtonClick')
  }

  setContext(isPastContextKey, {
    getIsPast: () => isPast
  })

  $: $params?.articleId && fetchArticleDetail($params?.articleId)
</script>

<div data-cid='expertDetail'>
  <BackBar>
    <BonusPoint slot='right' {bonus} />
  </BackBar>

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

    
    {#await othersPromise}
      <div class='rounded-t-[20px] bg-white'>
        <div class='px-4'><Title>{$t('expert.planDetail.othersPrediction')}</Title></div>
          <ExpertListLoading />
      </div>
    {:then response}
      {#if !isPast}
        <div class='rounded-t-[20px] bg-white'>
          <div class='px-4'><Title>{$t('expert.planDetail.othersPrediction')}</Title></div>
            <ExpertList list={response?.data?.list || []} />
        </div>
      {/if}
    {/await}
  </div>

  {#if !isPast}
    <BottomPanel {coin} {onButtonClick} />
  {/if}
</div>