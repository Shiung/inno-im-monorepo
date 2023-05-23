<script lang="ts">
  import { Ripple } from 'ui'
  import { timestampToFormat } from 'utils/convertDateAndTimestamp'

  import MarketInfo from '$src/components/MarketInfo'
  
  import winStamp from './images/ic_stamp_win.webp'
  
  import type { IArticle } from 'api/im/types/expert'

  import { twMerge } from 'tailwind-merge';
  
  export let article: IArticle

  export let hideStamp: boolean = false
  
  const getStamp = (hitStatus: IArticle['hitStatus']) => {
    switch (hitStatus) {
      case 1: return winStamp
      case 2:
      default:
        return ''
    }
  }

  $: stampStyle = hideStamp ? null : `background-image: url(${getStamp(article.hitStatus)});background-position: right -13px top -15px; background-size: 72px`
</script>

<Ripple class={twMerge('w-full rounded-[10px] im-shadow bg-no-repeat p-[8px]', $$props.class)} style={stampStyle}>
  <div class='text-[14px] font-semibold'>
    {timestampToFormat({ ts: article.releaseTime, format: 'MM-DD' }) } </div>

  <div class='flex items-center justify-between mt-[8px]'>
    <div class='text-[#999999] text-[12px]'> {article.tnName} </div>
    <div class='text-[12px]'>
      <span> {article.homeName} </span>
      <span> vs </span>
      <span> {article.awayName} </span>
    </div>
  </div>

  <div class='bg-[#eeeeee] h-[1px] my-[8px]' />

  <div class='truncate text-[14px] font-semibold'> {article.title} </div>

  <MarketInfo class='mt-[8px]' article={article} />

</Ripple>