<script lang="ts">
import { twMerge } from 'tailwind-merge'
import type { IArticle } from 'api/im/types/expert'
import { t } from '$stores'
import MarketBadget from '$src/components/MarketBadget'
export let article: IArticle

const mlAndAhResult = (_result: IArticle['matchResult']): string => {
  if (_result === 'h') return `${article.homeName} ${article?.odds[0]?.h ? '@' + article?.odds[0]?.h : ''}`
  else if (_result === 'a') return `${article.awayName} ${article?.odds[0]?.a ? '@' + article?.odds[0]?.a : ''}`
  else return ''
}

const ouResult = (_result: IArticle['matchResult']): string => {
  if (_result === 'ov') return `${$t('common.over')} ${article?.odds[0]?.ov ? '@' + article?.odds[0]?.ov : ''}`
  else if (_result === 'ud') return `${$t('common.under')} ${article?.odds[0]?.ud ? '@' + article?.odds[0]?.ud : ''}`
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

$: betType = betTypeGenerator(article)

</script>

<div class={twMerge('flex items-center', $$props.class)}>
  <MarketBadget marketType={article.marketType} />
  <div class='text-[12px] ml-[8px]'> {betType} </div>
</div>