<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'

  import BackBar from '$containers/BackBar'
  import BonusPoint from '$containers/HeaderNavigation/BonusPoint/index.svelte'

  import ArticleStoryLoading from './ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

  import OtherPredictions from './OtherPredictions/index.svelte'

  import BottomPanel from './BottomPanel/index.svelte'
  import UnlockButton from './BottomPanel/UnlockButton.svelte'
  import BetButton from './BottomPanel/BetButton.svelte'

  import { setIsPast } from './context'

  let coin: number = 1500
  let detailPromise: ReturnType<typeof im.expertArticleDetail>
  let bonus: number = 100000
  let isPast = false
  let isLocked = false

  const fetchArticleDetail = async (articleId: string) => {
    detailPromise = im.expertArticleDetail({ query: { articleId }})
      .then(response => {
        const { past, articleStatus } = response?.data
        if (past) isPast = true
        if (articleStatus === 2) isLocked = true
        return response
      })
  }

  $: setIsPast({ isPast })

  const onUnlockClick = () => {
    console.log('onUnlockClick')
  }

  const onFollowBetClick = () => {
    console.log('onFollowBetClick')
  }

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
        <PlanAnalysis data={detail?.data} isLocked={!isPast && isLocked} />
      {/await}
    </div>

    
    {#if !isPast && isLocked}
      {#await detailPromise then response}
        <OtherPredictions mid={response?.data?.mid} vd={response?.data?.vd} />
      {/await}
    {/if}
  </div>

  {#if !isPast}
    <BottomPanel>
      {#if isLocked}
        <UnlockButton {coin} onButtonClick={onUnlockClick} />
      {:else}
        <BetButton onButtonClick={onFollowBetClick} />
      {/if}
    </BottomPanel>
  {/if}
</div>