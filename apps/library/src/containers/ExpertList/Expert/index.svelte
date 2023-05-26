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
const { detailLocation } = getGoDetail() || {}

const goToDetail = () => {  
  if (typeof $detailLocation !== 'function') return push(`/expertDetail/${prodiction.expertId}/plan`)
  $detailLocation()
}

</script>

<div class='relative'>
  <Ripple class='w-full' on:click={() => console.log('body')}>
    <div class='flex justify-between'>
      <div class='flex flex-col justify-between'>
        <div class='grid gap-[10px] h-[50px]' style:grid-template-columns='44px auto'>

          <div />

          <div class='self-center'>
            <div class='text-[14px] font-semibold text-start'> {prodiction.expertName} </div>
            <div class='text-[10px] text-[#999999] text-left'> {convertReleaseTime(prodiction.releaseTime)} </div>
          </div>
        </div>

        <div class='flex items-center space-x-[4px]'>
          <MarketBadget marketType={prodiction.marketType} /> 
          <Strack streak={prodiction.hotStreak} />
        </div>
      </div>

      <div class='flex flex-col justify-between'>
        <Button class='row-span-1 h-[28px] rounded-[8px] self-end'> {$t('expert.limitFree')} </Button>

        <div class='flex text-[10px] items-end self-end'>
          <span class='text-[#666666]'> {$t('expert.hitRate')} </span>
          <span class='text-[26px] font-semibold leading-none'> {prodiction.hitRate} </span>
          <span> % </span>
        </div>
      </div>
    </div>

    <p class='mt-[10px] text-[14px] font-semibold truncate'> {prodiction.title} </p>

  </Ripple>

  <Ripple class='w-[44px] absolute top-0 left-0 rounded-full' on:click={goToDetail}>
    <ExpertImage class='border-[3px] border-white im-shadow' src={prodiction.expertImage} />
  </Ripple>
</div>
