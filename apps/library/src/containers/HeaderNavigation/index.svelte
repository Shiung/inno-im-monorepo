<script lang='ts'>
import BallSelection from './BallSelection/index.svelte'
import BonusPoint from './BonusPoint/index.svelte'

import type { SID } from '$types'

export let active: SID

</script>

<div>
  <div class='flex fixed w-full px-[8px] justify-between items-center h-[44px] im-shadow bg-white z-10'>
    <BallSelection active={active} />
    <BonusPoint />
  </div>

  <div class='h-[44px]'/>
</div>
