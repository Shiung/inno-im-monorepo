<script lang='ts'>
import type { IWebAnchor } from 'api/im/types'
import { Ripple } from 'ui'
import { t } from '$stores'

import AnchorStatus from '$containers/AnchorStatus'
import AnchorDetailSheet from '$containers/AnchorDetailSheet'

import Smile from '../images/smile.svg'

export let anchor: IWebAnchor
export let bg: string

let openDetailSheet: boolean = false

</script>

<div class='flex flex-col h-[154px] im-shadow rounded-[10px] bg-contain bg-no-repeat bg-bottom pt-[12px] pl-[12px]'
  style:background-image={`url("${bg}")`}
>
  <div class='text-imprimary'> { anchor.houseName } </div>
  <div class='text-[#999999] text-[12px]'> { anchor.nickName } </div>
  <div class='flex items-center'>
    <AnchorStatus liveStatus={anchor.liveStatus} />
  </div>

  <div class='flex flex-1 justify-between items-end'>
    <Ripple class='flex items-center space-x-[4px] h-[24px] im-shadow text-imprimary text-[10px] p-[7px] rounded-full bg-white mb-[12px]'
      on:click={() => openDetailSheet = true}
    >
      <Smile width={12} height={12} fill='rgb(var(--im-monorepo-primary))' />
      <div>{$t('anchor.detail')}</div>
    </Ripple>
    <img class='w-[75px] h-[75px]' src={anchor.userImage} alt='' />
  </div>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
