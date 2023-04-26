<script lang='ts'>
import { Button, Badget, Ripple } from 'ui'
import { push } from 'svelte-spa-router'
import { t } from '$stores'

import Strack from './Streak/index.svelte'

import type { IExpertPrediction } from 'api/im/types'

export let prodiction: IExpertPrediction

</script>

<div class='relative'>
  <Ripple class='w-full' on:click={() => console.log('body')}>
    <div class='flex justify-between'>
      <div class='flex flex-col justify-between'>
        <div class='grid gap-[10px] h-[50px]' style:grid-template-columns='44px auto'>

          <div />

          <div class='self-center'>
            <div class='text-[14px] font-semibold text-start'> {prodiction.expertName} </div>
            <div class='text-[10px] text-[#999999]'> {prodiction.releaseTime} </div>
          </div>
        </div>

        <div class='flex items-center space-x-[4px]'>
          <Badget> {prodiction.market} </Badget> 
          <Strack streak={prodiction.hotStreak} />
        </div>
      </div>

      <div class='flex flex-col justify-between'>
        <Button class='row-span-1 h-[28px] rounded-[8px]'> {$t('export.limitFree')} </Button>

        <div class='flex text-[10px] items-end'>
          <span class='text-[#666666]'> {$t('export.hitRate')} </span>
          <span class='text-[26px] font-semibold leading-none'> {prodiction.hitRate} </span>
          <span> % </span>
        </div>
      </div>
    </div>

    <p class='mt-[10px] text-[14px] font-semibold truncate'> {prodiction.title} </p>

  </Ripple>

  <Ripple class='w-[44px] absolute top-0 left-0 rounded-full' on:click={() => push(`/expertDetail/${prodiction.expertId}`)}>
    <img class='rounded-full border-[3px] border-white im-shadow' src={prodiction.expertImage} alt='' />
  </Ripple>
</div>
