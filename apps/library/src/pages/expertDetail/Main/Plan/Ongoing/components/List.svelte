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
    {@const {homeName, awayName, title, articleId } = article || {}}
    <div class='space-y-[8px] im-shadow rounded-[10px] p-[8px]'>
      <div class='truncate'> {title} </div>
      <!-- 玩法區塊 待討論 -->
      <div class='flex items-center'>
        <MarkInfo article={article} />
        {#if homeName && awayName}
          <div class='text-[12px] ml-[4px]'> {`${homeName} vs ${awayName}`} </div>
        {/if}
      </div>

      <Button class='w-full rounded-[12px] h-[44px]' on:click={() => push(`/planDetail/${$params.expertId}/${articleId}`)}>
        {$t('expert.plan.prediction')}
      </Button>
    </div>
  {/each}

</div>