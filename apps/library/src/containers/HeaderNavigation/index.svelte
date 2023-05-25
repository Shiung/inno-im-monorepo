<script lang='ts'>
import BallSelection from './BallSelection/index.svelte'
import BonusPoint from './BonusPoint/index.svelte'

import type { SidType } from 'utils/types'
import type { IIcon } from './types'

export let active: SidType
export let icons: IIcon[]

</script>

<div>
  <div class='flex fixed w-full px-[8px] justify-between items-center h-[44px] im-shadow bg-white z-10'>
    <BallSelection active={active} icons={icons} />
    <!-- <BonusPoint /> -->
  </div>

  <div class='h-[44px]'/>
</div>
