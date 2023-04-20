<script lang='ts'>
import { timestampToDatetime, getTime } from 'utils/convertDateAndTimestamp'
import type { IWebAnchorMatch } from 'api/im/types'
export let match: IWebAnchorMatch
</script>

{#if match.matchStatus === 2 }

  <div>
    <div class='text-imprimary text-center mb-[5px]'>
      <span> {match.homeScore[0]} </span>
      <span> : </span>
      <span> {match.awayScore[0]} </span>
    </div>

    <div class='text-[10px] text-center font-semibold'> {getTime(match.matchTime)} </div>
  </div>

{:else}

  <div>
    <div class='text-imprimary text-center mb-[5px]'> VS </div>
    <div class='text-[10px] text-center font-semibold'> {timestampToDatetime(match.matchTime)} </div>
  </div>

{/if}
