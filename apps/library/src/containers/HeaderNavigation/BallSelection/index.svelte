<script lang='ts'>
import soccer from '../images/soccer.webp'
import basketball from '../images/basketball.webp'
import baseball from '../images/baseball.webp'
import tennis from '../images/tennis.webp'

import Icon from './Icon.svelte'

import { SID } from '$types'

export let active: SID

interface IIcon {
  sid: SID
  url: string
  onClick: () => void
}

const icons: IIcon[] = [
  {
    sid: SID.soccer,
    url: soccer,
    onClick: () => console.log('soccer')
  },
  {
    sid: SID.basketBall,
    url: basketball,
    onClick: () => console.log('basketball')
  },
  {
    sid: SID.basketBall,
    url: baseball,
    onClick: () => console.log('baseball')
  },
  {
    sid: SID.tennis,
    url: tennis,
    onClick: () => console.log('tennis')
  },
]

</script>

<div class='flex'>
  {#each icons as icon}
    <Icon {...icon} active={active === icon.sid} /> 
  {/each}
</div>
