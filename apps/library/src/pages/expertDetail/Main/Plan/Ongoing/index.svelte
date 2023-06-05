<script lang='ts'>
import { push } from 'svelte-spa-router'
import { Button } from 'ui'
import { im } from 'api'
import { t } from '$stores'

import Empty from '$src/containers/Empty'
import MarkInfo from '$src/components/MarketInfo'

import Loading from './Loading.svelte'
import Title from '$src/components/Title/index.svelte'

export let expertId: string

const promise = im.expertArticleNow({ query: { expertId }})
</script>

<div>
  <Title> {$t('expert.plan.ongoing')} </Title>
  {#await promise}
    <Loading />

  {:then now}
    {#if !now?.data?.list?.length}
      <Empty class='h-[200px]' />
    {:else}
      <div class='space-y-[12px]'>

        {#each now?.data?.list || [] as article}
          <div class='space-y-[8px] im-shadow rounded-[10px] p-[8px]'>
            <div class='truncate'> {article.title} </div>
            <!-- 玩法區塊 待討論 -->
            <div class='flex items-center'>
              <MarkInfo article={article} />
              <div class='text-[12px] ml-[4px]'> {`${article.homeName} vs ${article.awayName}`} </div>
            </div>

            <Button class='w-full rounded-[12px] h-[44px]' on:click={() => push(`/planDetail/${expertId}/${article.articleId}`)}>
              {$t('expert.plan.prediction')}
            </Button>
          </div>
        {/each}

      </div>
    {/if}
  {:catch}
    <Empty class='h-[200px]' />
  {/await}
</div>
