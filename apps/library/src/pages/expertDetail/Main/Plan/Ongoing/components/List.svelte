<script lang="ts">
  import { t } from '$stores'
  import { push } from 'svelte-spa-router'
  import { Button } from 'ui'
  import MarkInfo from '$src/components/MarketInfo'
  import type { IArticle } from 'api/im/types/expert'
  import { params } from 'svelte-spa-router'

  export let articles: IArticle[] = []
</script>

<div class='space-y-[12px]'>

  {#each articles as article}
    <div class='space-y-[8px] im-shadow rounded-[10px] p-[8px]'>
      <div class='truncate'> {article.title} </div>
      <!-- 玩法區塊 待討論 -->
      <div class='flex items-center'>
        <MarkInfo article={article} />
        {#if article?.homeName && article?.awayName}
          <div class='text-[12px] ml-[4px]'> {`${article.homeName} vs ${article.awayName}`} </div>
        {/if}
      </div>

      <Button class='w-full rounded-[12px] h-[44px]' on:click={() => push(`/planDetail/${$params.expertId}/${article.articleId}`)}>
        {$t('expert.plan.prediction')}
      </Button>
    </div>
  {/each}

</div>