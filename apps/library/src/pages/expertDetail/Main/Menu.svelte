<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { params, push } from 'svelte-spa-router'
import { t } from '$stores'

import MenuButton from './MenuButton.svelte'

const routerPush = (method: string) => {
  push(`/expertDetail/${$params.expertId}/${method}`) 
}
</script>

<div class={twMerge('text-[14px] flex items-center justify-around h-[48px] overflow-hidden rounded-t-[20px]', $$props.class)}>
  <MenuButton actived={$params?.method === 'plan'} type='plan' on:click={() => routerPush('plan')}>
    {$t('expert.plan')} 
  </MenuButton>
  <MenuButton actived={$params?.method === 'statistics'} type='statistics' on:click={() => routerPush('statistics')}>
    {$t('expert.statistics')} 
  </MenuButton>
</div>
