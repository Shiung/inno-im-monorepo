<script lang='ts'>
import { Ripple } from 'ui'
import AnchorStatus from '$containers/AnchorStatus'

import Smile from '../../images/smile.svg'
import type { IWebAnchor } from 'api/im/types'

export let anchor: IWebAnchor
export let bg: string
</script>

<div class='grid grid-cols-[100px_1fr_30px] im-shadow h-[100px] rounded-[10px] px-[8px]'>
  <div class='flex items-end bg-contain bg-no-repeat bg-bottom' style:background-image={`url("${bg}")`}> 
    <img class='w-[95px]' src={anchor.userImage} alt='' />
  </div>

  <div>
    <div class='text-primary text-[18px]'> {anchor.houseName} </div>
    <div class='text-[12px] text-[#999999]'> {anchor.nickName} </div>
    <AnchorStatus liveStatus={anchor.liveStatus} />
  </div>

  <div class='py-[8px]'>
    <Ripple class='flex items-center justify-center h-[30px] w-[30px] im-shadow rounded-[9px] bg-white'>
      <Smile width={18} height={18} fill='rgb(var(--im-monorepo-primary))' />
    </Ripple>
  </div>
</div>


