<script lang='ts'>
import { t } from '$stores'
import MenuButton from './MenuButton.svelte'

export let method: 'plan' | 'statistics' = 'plan'

</script>

<div class='text-[14px] flex items-center justify-around h-[48px] overflow-hidden rounded-t-[20px]'>
  <MenuButton actived={method === 'plan'} type='plan' on:click={() => method = 'plan'}>
    {$t('expert.plan')} 
  </MenuButton>
  <MenuButton actived={method === 'statistics'} type='statistics' on:click={() => method = 'statistics'}>
    {$t('expert.statistics')} 
  </MenuButton>
</div>
