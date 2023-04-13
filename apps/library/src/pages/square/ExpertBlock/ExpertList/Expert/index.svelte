<script lang='ts'>
import { Button, Badget } from 'ui'
import type { IExpertPrediction } from 'api/im/types'

import Strack from './Streak/index.svelte'

import { t } from '$stores'
export let prodiction: IExpertPrediction

</script>

<div>
  <div class='h-[80px] grid grid-rows-3 grid-cols-[2fr_1fr]'>
    <div class='row-span-2'>
      <div class='grid grid-cols-[44px_auto]'>
        <img class='rounded-full border-[3px] border-white im-shadow' src={prodiction.expertImage} alt='' />
        <div>
          <div class='text-[14px] font-semibold'> {prodiction.expertName} </div>
          <div class='text-[10px] text-[#999999]'> {prodiction.releaseTime} </div>
        </div>
      </div>

    </div>

    <Button class='row-span-1 h-[28px] rounded-[8px]'> {$t('export.limitFree')} </Button>


    <div class='row-span-2 self-end self-justify-end flex justify-between w-full'>
      <div class='text-[10px]'>
        <span class='text-[#666666]'> {$t('export.hitRate')} </span>
        <span class='text-[26px] font-semibold'> {prodiction.hitRate} </span>
        <span> % </span>
      </div>
    </div>

    <div class='flex items-center space-x-[4px]'>
      <Badget> {prodiction.market} </Badget> 
      <Strack streak={prodiction.hotStreak} />
    </div>
  </div>

</div>
