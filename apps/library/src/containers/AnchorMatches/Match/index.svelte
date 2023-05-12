<script lang='ts'>
import { Ripple } from 'ui'
import TeamLogo from '$src/components/TeamLogo'

import Status from './Status.svelte'

import type { IWebAnchorMatch } from 'api/im/types'

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
        <TeamLogo class='w-[24px] h-[24px] mb-[5px]' src={match.homeTeamLogo} />
        <div class='text-[10px] text-center'> {match.homeTeamName} </div>
      </div>

      <Status match={match} />

      <div>  
        <TeamLogo class='w-[24px] h-[24px] mb-[5px]' src={match.awayTeamLogo} />
        <div class='text-[10px] text-center'> {match.awayTeamName} </div>
      </div>
      
    </div>
  </Ripple>
</div>
