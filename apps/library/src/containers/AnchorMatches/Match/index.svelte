<script lang='ts'>
import { Ripple } from 'ui'
import { twMerge } from 'tailwind-merge'
import TeamLogo from '$src/components/TeamLogo'
import { beImgUrlParse, ImageType } from 'utils/imgUrlParse'
import { goDetailCallback } from '$stores'
import Status from './Status.svelte'

import AnchorLiveBadge from '$containers/AnchorLiveBadge'

import type { IWebAnchorMatch } from 'api/im/types'

import { goSportDetailHOF } from '$src/utils/match'

import { StreamLiveStatus } from '$src/constant'

export let match: IWebAnchorMatch

$: isLive = match.matchStatus === StreamLiveStatus.LIVE

</script>

<div data-cid='Matches_Match' class='rounded-[16px]'
  style:background-color={isLive ? 'rgb(var(--im-monorepo-primary) / 0.1)' : '#fff'}
>
  <Ripple class={twMerge('w-full py-[12px] rounded-[16px] border', isLive ? 'border-imprimary': 'border-[#ddd]')}
    on:click={() => goSportDetailHOF(match, $goDetailCallback)}
  >
    <div class='text-[12px] text-center font-semibold mb-[10px]'> {match.tnName} </div>

    <div class='flex'>
      {#if isLive}
        <div class="absolute top-0 left-0 z-[1]">
          <AnchorLiveBadge />
        </div>
      {/if}

      <div class='flex-1 flex flex-col items-center px-[5px]'>  
        <TeamLogo class='w-[24px] h-[24px] mb-[5px]' src={beImgUrlParse({ id: match.homeId, type: ImageType.competitors })} />
        <div class='text-[10px] text-center'> {match.homeName} </div>
      </div>

      <div class='flex-[0_0_80px]'>
        <Status match={match} />
      </div>


      <div class='flex-1 flex flex-col items-center px-[5px]'>  
        <TeamLogo class='w-[24px] h-[24px] mb-[5px]' src={beImgUrlParse({ id: match.awayId, type: ImageType.competitors })} />
        <div class='text-[10px] text-center'> {match.awayName} </div>
      </div>
      
    </div>
  </Ripple>
</div>
