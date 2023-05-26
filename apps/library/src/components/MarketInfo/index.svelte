<script lang="ts">
import { twMerge } from 'tailwind-merge'
import type { IArticle } from 'api/im/types/expert'
import { t } from '$stores'
import MarketBadget from '$src/components/MarketBadget'
import { marketTypeDispatcher, type TResolver } from '$src/utils/match'
export let article: IArticle

$: dispatcher = marketTypeDispatcher(article?.marketType)

const getBetType: TResolver<[IArticle], string> = {
  ml(data) {
    if (data?.matchResult === 'h') return `${data?.homeName} ${data?.odds?.[0]?.h ? '@' + data?.odds?.[0]?.h : ''}`
    else if (data?.matchResult === 'a') return `${data?.awayName} ${data?.odds?.[0]?.a ? '@' + data?.odds?.[0]?.a : ''}`
    else return ''
  },
  ah(data) {
    if (data?.matchResult === 'h') return `${data?.homeName} ${data?.odds?.[0]?.h ? '@' + data?.odds?.[0]?.h : ''}`
    else if (data?.matchResult === 'a') return `${data?.awayName} ${data?.odds?.[0]?.a ? '@' + data?.odds?.[0]?.a : ''}`
    else return ''
  },
  ou(data) {
    if (data?.matchResult === 'ov') return `${$t('common.over')} ${data?.odds?.[0]?.ov ? '@' + data?.odds?.[0]?.ov : ''}`
    else if (data?.matchResult === 'ud') return `${$t('common.under')} ${data?.odds?.[0]?.ud ? '@' + data?.odds?.[0]?.ud : ''}`
    else return ''  
  }
}

$: betType = dispatcher(getBetType, article)

</script>

<div class={twMerge('flex items-center', $$props.class)}>
  <MarketBadget marketType={article.marketType} />
  <div class='text-[12px] ml-[8px]'> {betType} </div>
</div>