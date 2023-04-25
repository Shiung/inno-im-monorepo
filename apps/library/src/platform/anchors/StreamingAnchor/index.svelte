<script lang='ts'>
import { slide } from 'svelte/transition'
import { Ripple, Tween } from 'ui'
import { amountSymbolTransformer } from 'utils/amount'

import ArrowUp from './images/arrow_up.svg' 
import fans from './images/fans_on.webp'
import { streaming } from '../store'

let folder: boolean = false

</script>

{#if $streaming}
<div class='flex py-[12px] px-[16px] bg-white im-shadow rounded-b-[18px] ease-out duration-300'
  style:height={folder ? '50px' : '125px'}
  transition:slide|local
>
    <div class='relative flex flex-col items-center'>
      <div class='absolute w-full text-center bg-imprimary rounded-[20px] text-white text-[14px]'
        style:z-index='1'
        style:bottom={folder ? '3px' : '0px'}
      >

        {$streaming.nickName}
      </div>
      <img class='w-[90px] min-w-[90px] h-[90px] min-h-[90px] rounded-full border border-imprimary ease-out duration-300'
        style:opacity={folder ? 0 : 1 }
        src={$streaming.userImage} alt=''
      />

    </div>

    <div class='flex-1 ml-[10px] overflow-hidden'>
      <div class='flex items-center justify-between'>
        <div class='text-[16px] text-imprimary'> {$streaming.houseName} </div>
        <Ripple class='flex items-center justify-center w-[20px] h-[20px] rounded-full' on:click={() => folder = !folder}>
          <div class='duration-300' style:transform={folder ? 'rotate(180deg)' : 'rotate(0deg)'}>
            <ArrowUp width={14} height={14} fill='#333333' />
          </div>
        </Ripple>
      </div>

      <div class='truncate'>
        {$streaming.description}
      </div>

      <div class='flex'>
        <span class='items-center px-[5px] rounded-[5px] text-[#999999] text-[6px] bg-[rgba(238,238,238,0.5)]'> 
          {$streaming.anchorTypeName}
        </span>
      </div>

      <div class='flex items-end mt-[15px]'>
        <img class='w-[30px] mr-[10px]' src={fans} alt='' />
        <Tween value={amountSymbolTransformer($streaming.fansCount)} /> 
      </div>

    </div>
  </div>
{/if}
