<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'

  import BackBar from '$containers/BackBar'
  import BonusPoint from '$containers/HeaderNavigation/BonusPoint/index.svelte'

  import ArticleStoryLoading from './ArticleStory/components/Loading.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

  import OtherPredictions from './OtherPredictions/index.svelte'

  import BottomPanel from './BottomPanel/index.svelte'
  import UnlockButton from './BottomPanel/components/UnlockButton.svelte'
  import BetButton from './BottomPanel/components/BetButton.svelte'

  import { setIsPast } from './context'

  let response, loading: boolean
  let coin: number = 1500
  let bonus: number = 100000
  let isPast = false
  let isLocked = false

  const fetchArticleDetail = async (articleId: string) => {
    loading = true
    response = await im.expertArticleDetail({ query: { articleId }})
    loading = false
    const { past, articleStatus } = response?.data
    if (past) isPast = true
    if (articleStatus === 2) isLocked = true
  }

  const onUnlockClick = () => {
    console.log('onUnlockClick')
  }

  const onFollowBetClick = () => {
    console.log('onFollowBetClick')
  }

  $: setIsPast({ isPast })

  $: $params?.articleId && fetchArticleDetail($params?.articleId)
</script>

<div data-cid='planDetail'>
  <BackBar>
    <!-- <BonusPoint slot='right' {bonus} /> -->
  </BackBar>

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
      <OtherPredictions mid={response?.data?.mid} vd={response?.data?.vd} />
    {/if}
  </div>

  <!-- {#if !loading && !isPast}
    <BottomPanel>
      {#if isLocked}
        <UnlockButton {coin} onButtonClick={onUnlockClick} />
      {:else}
        <BetButton onButtonClick={onFollowBetClick} />
      {/if}
    </BottomPanel>
  {/if} -->
</div>