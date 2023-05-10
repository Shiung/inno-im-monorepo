<script lang='ts'>
import { Ripple } from 'ui'
import AnchorStatus from '$containers/AnchorStatus'
import AnchorMatches from '$containers/AnchorMatches/index.svelte'
import AnchorDetailSheet from '$containers/AnchorDetailSheet'
import AnchorImage from '$src/components/AnchorImage'
import { t } from '$stores'

import Smile from '../../images/smile.svg'
import Arrow from '../../images/arrow_down_small.svg'
import type { IWebAnchor } from 'api/im/types'


export let anchor: IWebAnchor
export let bg: string

let showMatchList: boolean
let openDetailSheet: boolean

</script>

<div>
  <div class='grid grid-cols-[100px_1fr_30px] im-shadow h-[100px] rounded-[10px] px-[8px]'>
    <div class='w-[95px] flex items-end bg-contain bg-no-repeat bg-bottom overflow-hidden' style:background-image={`url("${bg}")`}> 
      <AnchorImage src={anchor?.userImage} />
    </div>

    <div class='flex flex-col py-[10px] justify-between'>
      <div>
        <div class='text-imprimary text-[18px]'> {anchor.houseName} </div>
        <div class='text-[12px] text-[#999999]'> {anchor.nickName} </div>
      </div>
    
      <div class='flex items-center'>
        <AnchorStatus class='mr-[5px]' liveStatus={anchor.liveStatus} />

        <div class='rounded-[5px] overflow-hidden' style:background-color='rgb(var(--im-monorepo-primary) / 0.1)'>
          <Ripple class='flex items-center text-imprimary text-[10px] h-[20px] pl-[10px]'
            ripple='#eeeeee'
            on:click={() => showMatchList = !showMatchList}
          > 
            <span>{$t('anchor.matchList')} </span>
            <div class='duration-300' style:transform={showMatchList ? 'rotate(180deg)' : ''}>
              <Arrow class='mx-[5px]' width={13} height={14} fill='rgb(var(--im-monorepo-primary))' />
            </div>
          </Ripple>
        </div>

      </div>
    </div>

    <div class='py-[8px]'>
      <Ripple class='flex items-center justify-center h-[30px] w-[30px] im-shadow rounded-[9px] bg-white'
        on:click={() => openDetailSheet = true }
      >
        <Smile width={18} height={18} fill='rgb(var(--im-monorepo-primary))' />
      </Ripple>
    </div>
  </div>

  {#if showMatchList}
    <AnchorMatches houseId={anchor.houseId} />
  {/if}

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>

