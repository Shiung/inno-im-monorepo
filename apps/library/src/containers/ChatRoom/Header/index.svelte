<script lang="ts">
import { Ripple } from 'ui'
import { t } from '$stores'

import Info from '../images/info.svg'
import Close from '../images/close.svg'
</script>

<div class='flex items-center justify-between min-h-[44px] px-[15px]'>
  <div class='flex'>
    <div class='text-[18px] font-semibold'> {$t('chat.title')} </div>
    <Ripple class='rounded-full flex items-center justify-center w-[25px] h-[25px]'
      on:click={() => console.log('info')}
    >
      <Info width={20} height={20} fill='#999999' />
    </Ripple>
  </div>

  <Ripple class='rounded-full' on:click={() => console.log('close')}>
    <Close width={20} height=[20] fill='#333333' />
  </Ripple>
</div>
