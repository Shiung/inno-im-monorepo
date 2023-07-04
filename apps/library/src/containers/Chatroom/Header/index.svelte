<script lang="ts">
import { slide } from 'svelte/transition'
import { createEventDispatcher } from 'svelte'
import { Ripple } from 'ui'
import { t } from '$stores'
import { twMerge } from 'tailwind-merge'

import { Marquee } from 'ui'

import Info from '../images/info.svg'
import Close from '../images/close.svg'

import { getEnv } from '../context'

export let isTransition: boolean
export let fixed: boolean = false

const dispatch = createEventDispatcher()
const { height, device }  = getEnv()

let showRemind: boolean = false

let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height

$: marqueeInfo = [
  $t('chat.remind')
]

</script>

<div>
  {#if $device === 'wap'}
    <div
      class={twMerge(
        'w-full bg-white flex items-center justify-between min-h-[44px] px-[15px] z-30 transition-[top] duration-300 ease-in-out',
        fixed ? 'fixed left-0' : 'sticky'
      )}
      style:top={fixed ? !isTransition ? `${$height}px` : '' : '0'}
      bind:this={dom}
    >
      <div class='flex items-center'>
        <div class='text-[18px] font-semibold'> {$t('chat.title')} </div>
        <Ripple class='rounded-full flex items-center justify-center w-[25px] h-[25px]'
          on:click={() => showRemind = !showRemind}
        >
          <Info width={20} height={20} fill={showRemind ? 'rgb(var(--im-monorepo-primary))': '#999999'} />
        </Ripple>

        {#if showRemind}
          <div transition:slide={{ axis: 'x' }}>
            <Marquee
              infos={marqueeInfo}
              class='text-[12px] bg-[#eeeeee] rounded-[10px] py-[6px] px-[10px] whitespace-nowrap w-[200px] overflow-hidden'/>
          </div>
        {/if}

      </div>

      <Ripple class='rounded-full' on:click={() => dispatch('close')}>
        <Close width={20} height={20} fill='#333333' />
      </Ripple>
    </div>

    <div style:height={fixed && `${blockHeight}px`} />
  {:else}
    <div class='flex justify-center items-center w-full min-h-[30px] text-[#bbb] text-xs'>{$t('chat.remind')}</div>
  {/if}
</div>
