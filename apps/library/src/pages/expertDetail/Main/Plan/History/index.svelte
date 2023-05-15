<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { t } from '$stores'

import MarketInfo from '$src/components/MarketInfo'

import Title from '../../components/Title.svelte'
import Filter from '../../images/filter.svg'

export let expertId: string
const promise = im.expertArticleHistory({ query: { expertId, pageIdx: 1, pageSize: 10 }})
</script>

<div>
  <div class='flex items-center justify-between'>
    <Title> {$t('expert.plan.history')} </Title>
    <Ripple class='flex items-center justify-center w-[32px] h-[32px] rounded-full'
      on:click={() => console.log('Filter')}
    >
      <Filter width={20} height={20} fill='#333333' />
    </Ripple>
  </div>

  {#await promise}
    <div> loading </div>

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
          
          <MarketInfo market={{
              marketType: article.marketType,
              matchResult: article.matchResult,
              odds: article.odds
            }} 
          />

        </div>
      {/each}
    </div>

  {/await}
</div>
