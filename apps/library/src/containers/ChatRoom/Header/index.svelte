<script lang="ts">
import { fade } from 'svelte/transition'
import { Ripple } from 'ui'
import { t } from '$stores'

import Info from '../images/info.svg'
import Close from '../images/close.svg'

let showRemind: boolean = false

</script>

<div class='flex items-center justify-between min-h-[44px] px-[15px]'>
  <div class='flex items-center'>
    <div class='text-[18px] font-semibold'> {$t('chat.title')} </div>
    <Ripple class='rounded-full flex items-center justify-center w-[25px] h-[25px]'
      on:click={() => showRemind = !showRemind}
    >
      <Info width={20} height={20} fill='#999999' />
    </Ripple>

    {#if showRemind}
      <div transition:fade|locale class='text-[12px] bg-[#eeeeee] rounded-[10px] py-[6px] px-[10px]'>
        {$t('chat.remind')}
      </div>
    {/if}

  </div>


  <Ripple class='rounded-full' on:click={() => console.log('close')}>
    <Close width={20} height=[20] fill='#333333' />
  </Ripple>
</div>
