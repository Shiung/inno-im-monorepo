<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { t } from '$stores'
import MenuButton from './MenuButton.svelte'

export let method: 'plan' | 'statistics' = 'plan'

</script>

<div class={twMerge('text-[14px] flex items-center justify-around h-[48px] overflow-hidden rounded-t-[20px]', $$props.class)}>
  <MenuButton actived={method === 'plan'} type='plan' on:click={() => method = 'plan'}>
    {$t('expert.plan')} 
  </MenuButton>
  <MenuButton actived={method === 'statistics'} type='statistics' on:click={() => method = 'statistics'}>
    {$t('expert.statistics')} 
  </MenuButton>
</div>
