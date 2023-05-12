<script lang="ts">
  import { params } from 'svelte-spa-router'
  import Title from '$pages/expertDetail/Main/components/Title.svelte'
  import Loading from './components/Loading/index.svelte'
  import { t } from '$stores'
  import BetType from '../../components/BetType'
  import { im } from 'api'

  const promise = im.expertArticleHit({ query: { expertId: $params.expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div class="px-4">
  <Title> {$t('expert.plan.history')} </Title>
</div>

<div class="px-3">
  {#await promise}
    <Loading />
  {:then articles}
    <div class='space-y-[12px]'>
      {#each articles?.data?.list || [] as article}
        <div class='rounded-[10px] im-shadow p-[8px]'>
          <div class='text-[14px] font-semibold'> {article.releaseTime} </div>

          <div class='flex items-center justify-between mt-[8px]'>
            <div class='text-[#999999] text-[12px]'> {article.leagueName} </div>
            <div class='text-[12px]'>
              <span> {article.homeName} </span>
              <span> vs </span>
              <span> {article.awayName} </span>
            </div>
          </div>

          <div class='bg-[#eeeeee] h-[1px] my-[8px]' />

          <div class='truncate text-[14px] font-semibold'> {article.title} </div>
          
          <BetType market={article.market} />

        </div>
      {/each}
    </div>
  {/await}
</div>