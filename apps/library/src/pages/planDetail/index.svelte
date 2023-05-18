<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/pages/expertDetail/Main/components/Title.svelte'

  import ArticleStoryLoading from './components/ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './components/ArticleStory/index.svelte'

  import MatchPanelLoading from './components/MatchPanel/Loading.svelte'
  import MatchPanel from './components/MatchPanel/index.svelte'

  import PlanAnalysisLoading from './components/PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './components/PlanAnalysis/index.svelte'

  $: promise = im.expertArticleDetail({ query: { articleId: $params?.articleId }})
</script>

<div class='space-y-3'>
  <div>
    {#await promise}
      <ArticleStoryLoading />
    {:then detail}
      <ArticleStory data={detail?.data} />
    {/await}
    <Info />
  </div>

  <div class='rounded-[20px] bg-white'>
    <div class="px-4"><Title>{$t('expert.planDetail.recommendMatches')}</Title></div>
    
    {#await promise}
      <MatchPanelLoading />
    {:then detail}
      <MatchPanel data={detail?.data} />
    {/await}

    <div class='px-4'><Title>{$t('expert.planDetail.planAnalysis')}</Title></div>

    {#await promise}
      <PlanAnalysisLoading />
    {:then detail}
      <PlanAnalysis data={detail?.data} />
    {/await}
  </div>

  <div class='rounded-t-[20px] bg-white'>
    <div class='px-4'><Title>{$t('expert.planDetail.othersPrediction')}</Title></div>
  </div>
</div>