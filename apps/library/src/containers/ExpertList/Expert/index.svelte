<script lang='ts'>
import { Button, Ripple } from 'ui'
import { convertTimeDiffToPast } from 'utils/convertDateAndTimestamp'
import { push } from 'svelte-spa-router'
import { t } from '$stores'
import { getGoDetail } from '$src/platform/expert/context'

import Strack from '$containers/Streak'
import ExpertImage from '$src/components/ExpertImage'
import MarketBadget from '$src/components/MarketBadget'

import type { IExpertPrediction } from 'api/im/types'

export let prodiction: IExpertPrediction

const convertReleaseTime = (releaseTime: number) => {
  const time = convertTimeDiffToPast({now: Date.now(), past: releaseTime})

  switch (time.unit) {
    case 'sec': return $t('common.secsPast', { num: time.text })
    case 'min': return $t('common.minsPast', { num: time.text })
    case 'hour': return $t('common.hoursPast', { num: time.text })
    case 'date': return time.text
    default: return time.text
  }
}
const { goExpertDetailCallback, goPlanDetailCallback } = getGoDetail() || {}

const goToExpertDetail = () => {  
  if (typeof $goExpertDetailCallback !== 'function') return push(`/expertDetail/${prodiction.expertId}/plan`)
  $goExpertDetailCallback(`/expertDetail/${prodiction.expertId}/plan`)
}

const goToPlanDetail = () => {  
  if (typeof $goPlanDetailCallback !== 'function') return push(`/planDetail/${prodiction.expertId}/${prodiction.articleId}`)
  $goPlanDetailCallback(`/planDetail/${prodiction.expertId}/${prodiction.articleId}`)
}

</script>

<Ripple class='w-full' on:click={goToPlanDetail}>
  <div class='flex justify-between'>
    <div class='flex flex-col justify-between'>
      <Ripple
        class='grid gap-[10px] h-[50px] pl-[6px]'
        style={'grid-template-columns: 44px auto'}
        on:click={goToExpertDetail}
      >
        <ExpertImage class='border-[3px] border-white im-shadow' src={prodiction.expertImage} />

        <div class='self-center'>
          <div class='text-[14px] font-semibold text-start'> {prodiction.expertName} </div>
          <div class='text-[10px] text-[#999999] text-left'> {convertReleaseTime(prodiction.releaseTime)} </div>
        </div>
      </Ripple>
        
      <div class='flex items-center space-x-[4px] pl-[6px]'>
        <MarketBadget marketType={prodiction.marketType} /> 
        <Strack streak={prodiction.hotStreak} />
      </div>
    </div>

    <div class='flex flex-col justify-between pl-[6px]'>
      <Button class='row-span-1 h-[28px] rounded-[8px] self-end'> {$t('expert.limitFree')} </Button>

      <div class='flex text-[10px] items-end self-end'>
        <span class='text-[#666666]'> {$t('expert.hitRate')} </span>
        <span class='text-[26px] font-semibold leading-none'> {prodiction.hitRate} </span>
        <span> % </span>
      </div>
    </div>
  </div>

  <p class='mt-[10px] text-[14px] font-semibold truncate pl-[6px]'> {prodiction.title} </p>
</Ripple>