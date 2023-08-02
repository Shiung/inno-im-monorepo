<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t, locale, userAuth } from '$stores'
  import { CODE_STATUS_OK } from '$src/constant'
  import type { IFetchArticleDetailQuery } from './type'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'

  import BackBar from '$containers/BackBar'

  import ArticleStoryLoading from './ArticleStory/components/Loading.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

  import OtherPredictions from './OtherPredictions/index.svelte'

  import { setIsPast, setFetchArticleDetail } from './context'
  import FloatingKey from '$src/containers/FloatKey'

  let response: Awaited<ReturnType<typeof im.expertArticleDetail>>
  let loading: boolean
  let isPast = false
  let isLocked = false

  const fetchArticleDetail = async (query: IFetchArticleDetailQuery) => {
    const { articleId, lang, token } = query || {}

    if (!token) return

    loading = true
    response = await im.expertArticleDetail({ query: { articleId }, headers: { 'Accept-Language': lang }})
    loading = false

    if (response.code !== CODE_STATUS_OK) return

    const { past, articleStatus } = response?.data
    if (past) isPast = true
    isLocked = articleStatus === 2
  }

  $: setIsPast({ isPast })

  $: $params?.articleId && fetchArticleDetail({
    articleId: $params?.articleId,
    lang: $locale,
    token: $userAuth.userToken
  })
  
  setFetchArticleDetail({ fetchArticleDetail })
</script>

<div data-cid='planDetail'>
  <BackBar />

  <div class='space-y-3'>
    <div>
      {#if loading}
        <ArticleStoryLoading />
      {:else}
        <ArticleStory data={response?.data} />
      {/if}
      <Info />
    </div>

    <div class='rounded-[20px] bg-white'>
      <div class="px-4"><Title>{$t('expert.planDetail.recommendMatches')}</Title></div>
      
      {#if loading}
        <MatchPanelLoading />
      {:else}
        <MatchPanel data={response?.data} />
      {/if}

      <div class='px-4'><Title>{$t('expert.planDetail.planAnalysis')}</Title></div>

      {#if loading}
        <PlanAnalysisLoading />
      {:else}
        <PlanAnalysis data={response?.data} isLocked={!isPast && isLocked} />
      {/if}
    </div>

    
    {#if !loading && !isPast}
      {#key $locale}
        <OtherPredictions mid={response?.data?.mid} vd={response?.data?.vd} />
      {/key}
    {/if}
  </div>

  <FloatingKey />
</div>