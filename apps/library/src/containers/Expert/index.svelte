<script lang='ts'>
import { Button, Ripple } from 'ui'
import { convertTimeDiffToPast } from 'utils/convertDateAndTimestamp'
import { push } from 'svelte-spa-router'
import { t } from '$stores'
import type { IExpertPrediction } from 'api/im/types'

import Strack from '$containers/Streak'
import ExpertImage from '$src/components/ExpertImage'
import MarketBadget from '$src/components/MarketBadget'

import type { GoToExpertDetail, GoToPlanDetail } from './type'

export let prediction: IExpertPrediction
export let goToExpertDetailCallback: GoToExpertDetail = null
export let goToPlanDetailCallback: GoToPlanDetail = null

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

const goToExpertDetail = () => {
  if (typeof goToExpertDetailCallback !== 'function') return push(`/expertDetail/${prediction.expertId}/plan`)

  goToExpertDetailCallback(`/expertDetail/${prediction.expertId}/plan`)
}

const goToPlanDetail = () => {
  if (typeof goToPlanDetailCallback !== 'function') return push(`/planDetail/${prediction.expertId}/${prediction.articleId}`)

  goToPlanDetailCallback(`/planDetail/${prediction.expertId}/${prediction.articleId}`)
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
        <ExpertImage class='border-[3px] border-white im-shadow' src={prediction.expertImage} />

        <div class='self-center'>
          <div class='text-[14px] font-semibold text-start'> {prediction.expertName} </div>
          <div class='text-[10px] text-[#999999] text-left'> {convertReleaseTime(prediction.releaseTime)} </div>
        </div>
      </Ripple>
        
      <div class='flex items-center space-x-[4px] pl-[6px]'>
        <MarketBadget marketType={prediction.marketType} /> 
        <Strack streak={prediction.hotStreak} />
      </div>
    </div>

    <div class='flex flex-col justify-between pl-[6px]'>
      <Button class='row-span-1 h-[28px] rounded-[8px] self-end'> {$t('expert.limitFree')} </Button>

      <div class='flex text-[10px] items-end self-end'>
        <span class='text-[#666666]'> {$t('expert.hitRate')} </span>
        <span class='text-[26px] font-semibold leading-none'> {prediction.hitRate} </span>
        <span> % </span>
      </div>
    </div>
  </div>

  <p class='text-left mt-[10px] text-[14px] font-semibold truncate pl-[6px]'> {prediction.title} </p>
</Ripple>