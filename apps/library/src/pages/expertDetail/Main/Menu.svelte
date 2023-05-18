<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { params, replace } from 'svelte-spa-router'
import { t } from '$stores'

import MenuButton from './MenuButton.svelte'

const routerReplace = (method: string) => {
  replace(`/expertDetail/${$params.expertId}/${method}`) 
}
</script>

<div class={twMerge('text-[14px] flex items-center justify-around h-[48px] overflow-hidden rounded-t-[20px]', $$props.class)}>
  <MenuButton actived={$params?.method === 'plan'} type='plan' on:click={() => routerReplace('plan')}>
    {$t('expert.plan')} 
  </MenuButton>
  <MenuButton actived={$params?.method === 'statistics'} type='statistics' on:click={() => routerReplace('statistics')}>
    {$t('expert.statistics')} 
  </MenuButton>
</div>
