<script lang="ts">
  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { t } from '$stores'

  import Info from '$src/pages/expertDetail/Info/index.svelte'
  import Title from '$src/components/Title/index.svelte'

  import ArticleStoryLoading from './ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './ArticleStory/index.svelte'

  import MatchPanelLoading from './MatchPanel/Loading.svelte'
  import MatchPanel from './MatchPanel/index.svelte'

  import PlanAnalysisLoading from './PlanAnalysis/components/Loading.svelte'
  import PlanAnalysis from './PlanAnalysis/index.svelte'

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