<script lang='ts'>
import type { IWebAnchorMatch } from 'api/im/types'
import { Ripple } from 'ui'

import Status from './Status.svelte'

export let match: IWebAnchorMatch
</script>

<div data-cid='Matches_Match' class='rounded-[16px]'
  style:background-color={'rgb(var(--im-monorepo-primary) / 0.1)'}
>
  <Ripple class='w-full py-[12px] rounded-[16px] border border-imprimary'
    on:click={() => console.log(match.matchId)}
  >
    <div class='text-[12px] text-center font-semibold mb-[10px]'> {match.competitionName} </div>

    <div class='flex justify-around'>

      <div>  
        <img class='w-[24px] h-[24px] mb-[5px]' src={match.homeTeamLogo} alt='' />
        <div class='text-[10px] text-center'> {match.homeTeamName} </div>
      </div>

      <Status match={match} />

      <div>  
        <img class='w-[24px] h-[24px] mb-[5px]' src={match.awayTeamLogo} alt='' />
        <div class='text-[10px] text-center'> {match.awayTeamName} </div>
      </div>
      
    </div>
  </Ripple>
</div>
