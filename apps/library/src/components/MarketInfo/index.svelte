<script lang="ts">
import { twMerge } from 'tailwind-merge'
import type { IArticle } from 'api/im/types/expert'
import { t } from '$stores'
import MarketBadget from '$src/components/MarketBadget'
import { marketTypeDispatcher } from '$src/utils/match'
export let article: IArticle

const mlAndAhResult = (_result: IArticle['matchResult']): string => {
  if (_result === 'h') return `${article.homeName} ${article?.odds?.[0]?.h ? '@' + article?.odds?.[0]?.h : ''}`
  else if (_result === 'a') return `${article.awayName} ${article?.odds?.[0]?.a ? '@' + article?.odds?.[0]?.a : ''}`
  else return ''
}

const ouResult = (_result: IArticle['matchResult']): string => {
  if (_result === 'ov') return `${$t('common.over')} ${article?.odds?.[0]?.ov ? '@' + article?.odds?.[0]?.ov : ''}`
  else if (_result === 'ud') return `${$t('common.under')} ${article?.odds?.[0]?.ud ? '@' + article?.odds?.[0]?.ud : ''}`
  else return ''
}


const betTypeGenerator = (article?: IArticle) => {
  if (!article) return ''

  switch (article.marketType) {
    case '11':
    case '21':
    case '12':
    case '22':
      return mlAndAhResult(article.matchResult)
    case '13':
    case '23':
      return ouResult(article.matchResult)
  }
}

const getBetType = {
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

$: dispatcher = marketTypeDispatcher(article?.marketType, article)
$: betType = dispatcher(getBetType)

</script>

<div class={twMerge('flex items-center', $$props.class)}>
  <MarketBadget marketType={article.marketType} />
  <div class='text-[12px] ml-[8px]'> {betType} </div>
</div>