<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import Menu from './Menu/index.svelte'
import ExpertList from '$containers/ExpertList'

import type { IExpertMenu } from './types'
import type { SidType } from 'utils'

export let sid: SidType
export let folder: boolean = false
let actived: IExpertMenu['type'] = 0

const menu: IExpertMenu[] = [
  { 
    i18n: 'expert.hit',
    type: 0,
    onClick: () => console.log('expert.hit') 
  },
  {
    i18n: 'expert.winningStreakKing',
    type: 1,
    onClick: () => console.log('expert.winningStreakKing') 
  },
  // TODO
  // {
  //   i18n: 'expert.followUp',
  //   type: 2,
  //   onClick: () => console.log('expert.followUp')
  // },
]

</script>


<div data-cid='ExpertWithMenu' class={twMerge('bg-white', $$props.class)}>
  <Menu class='border-b divide-solid' menu={menu} bind:actived={actived} />
  <ExpertList actived={actived} sid={sid} folder={folder} /> 
</div>
