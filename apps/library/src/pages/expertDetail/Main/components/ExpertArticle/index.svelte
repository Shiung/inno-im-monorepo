<script lang='ts'>
  import BetType from '../BetType'
  import type { IExpertArticleHit } from 'api/im/types'
  export let data: IExpertArticleHit['res']['data']['list']
</script>

{#if data.length}
  <div class='space-y-[12px]'>
    {#each data || [] as article}
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
{/if}