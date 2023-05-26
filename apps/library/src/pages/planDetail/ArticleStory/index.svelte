<script lang='ts'>
  import { t } from '$stores'
  import type { IArticleDetail } from 'api/im/types'

  import MarketBadget from '$src/components/MarketBadget'

  // import TimerLabel from './components/TimerLabel.svelte'

  import { timestampToFormat } from 'utils/convertDateAndTimestamp'
  import { getIsPast } from '../context'

  const { isPast } = getIsPast()

  export let data: IArticleDetail
</script>

<div data-cid='ArticleStory' class='bg-white px-3 pt-3 pb-2'>
  <div class='min-h-[84px] relative z-[1] rounded-[10px] p-2 bg-white im-shadow space-y-2'>
    <!-- header -->
    <div class='flex items-center justify-between'>
      <div class='flex items-center space-x-1'>
        <MarketBadget marketType={data?.marketType} />
        <!-- {#if !$isPast}
          <TimerLabel />
        {/if} -->
      </div>

      <span class='text-[10px] leading-[15px] text-[#999]'>
        {#if !$isPast}
          {timestampToFormat({ ts: data?.releaseTime, format: 'DD-MM mm:ss' })} {$t('common.publish')}
        {:else}
          {timestampToFormat({ ts: data?.releaseTime, format: 'DD-MM' })}
        {/if}
      </span>
    </div>

    <!-- title -->
    <p class='text-[#333] text-[14px] leading-normal font-semibold'>{data?.title}</p>
  </div>
</div>