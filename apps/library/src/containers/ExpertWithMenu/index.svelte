<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Menu from './Menu/index.svelte'
import ExpertList from '$containers/ExpertList'

import type { IExpertMenu } from './types'
import type { SidType } from 'utils'

export let sid: SidType
let actived: IExpertMenu['type'] = 0

const menu: IExpertMenu[] = [
  { 
    i18n: 'export.hit',
    type: 0,
    onClick: () => console.log('export.hit') 
  },
  {
    i18n: 'export.winningStreakKing',
    type: 1,
    onClick: () => console.log('export.winningStreakKing') 
  },
  {
    i18n: 'export.followUp',
    type: 2,
    onClick: () => console.log('export.followUp')
    },
]

</script>


<div data-cid='ExpertWithMenu' class={twMerge('bg-white', $$props.class)}>
  <Menu class='border-b divide-solid' menu={menu} bind:actived={actived} />
  <ExpertList actived={actived} sid={sid} /> 
</div>
