<script lang="ts">
import { timestampToFormat } from 'utils/convertDateAndTimestamp'

import MarketInfo from '$src/components/MarketInfo'
import Empty from '$src/containers/Empty'

import winStamp from './images/ic_stamp_win.webp'

import type { IArticle } from 'api/im/types/expert'

export let articles: IArticle[] = []

const getStamp = (hitStatus: IArticle['hitStatus']) => {
  switch (hitStatus) {
    case 1: return winStamp
    case 2:
    default:
      return ''
  }
}

</script>

{#if articles.length === 0}
  <Empty class='h-[300px]' />
{:else}
  <div class='space-y-[12px]'>
    {#each articles as article}
      <div class='rounded-[10px] im-shadow bg-no-repeat p-[8px]'
        style:background-image={`url(${getStamp(article.hitStatus)})`}
        style:background-position='right -13px top -15px'
        style:background-size='72px'
      >
        <div class='text-[14px] font-semibold'>
         {timestampToFormat({ ts: article.releaseTime, format: 'MM-DD' }) } </div>

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
    
        <MarketInfo class='mt-[8px]' article={article} />

      </div>
    {/each}
  </div>
{/if}