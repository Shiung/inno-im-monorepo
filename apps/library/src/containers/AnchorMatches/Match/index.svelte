<script lang='ts'>
import { Ripple } from 'ui'
import TeamLogo from '$src/components/TeamLogo'
import { beImgUrlParse, ImageType } from 'utils/imgUrlParse'

import Status from './Status.svelte'

import type { IWebAnchorMatch } from 'api/im/types'

export let match: IWebAnchorMatch
</script>

<div data-cid='Matches_Match' class='rounded-[16px]'
  style:background-color={'rgb(var(--im-monorepo-primary) / 0.1)'}
>
  <Ripple class='w-full py-[12px] rounded-[16px] border border-imprimary'
    on:click={() => console.log(match.mid)}
  >
    <div class='text-[12px] text-center font-semibold mb-[10px]'> {match.tnName} </div>

    <div class='flex'>

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
