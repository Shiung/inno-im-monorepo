<script lang='ts'>
import all from '../images/all.webp'
import soccer from '../images/soccer.webp'
import basketball from '../images/basketball.webp'
import baseball from '../images/baseball.webp'
import tennis from '../images/tennis.webp'

import Icon from './Icon.svelte'

import type { SidType } from 'utils/types'

import type { IIcon } from '../types'


export let active: SidType
export let icons: IIcon[] = []

const iconUrlDict = {
  '0': all,
  '1': soccer,
  '2': basketball,
  '3': tennis,
  '4': baseball
}

</script>

<div class='flex'>
  {#each icons as icon}
    <Icon {...icon} url={iconUrlDict[icon.sid]} active={active === icon.sid} /> 
  {/each}
</div>
