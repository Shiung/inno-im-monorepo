<script lang='ts'>
import all from '../images/all.webp'
import soccer from '../images/soccer.webp'
import basketball from '../images/basketball.webp'
import baseball from '../images/baseball.webp'
import tennis from '../images/tennis.webp'

import Icon from './Icon.svelte'

import { SID } from 'utils/types'

import type { IIcon } from '../types'


export let active: SID
export let icons: IIcon[] = []

const iconUrlDict: {[k in SID]: string} = {
  [SID.all]: all,
  [SID.soccer]: soccer,
  [SID.basketball]: basketball,
  [SID.tennis]: tennis,
  [SID.baseball]: baseball
}

</script>

<div class='flex'>
  {#each icons as icon}
    <Icon {...icon} url={iconUrlDict[icon.sid]} active={active === icon.sid} /> 
  {/each}
</div>
