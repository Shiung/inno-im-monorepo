<script lang='ts'>
import soccer from '../images/soccer.webp'
import basketball from '../images/basketball.webp'
import baseball from '../images/baseball.webp'
import tennis from '../images/tennis.webp'

import Icon from './Icon.svelte'

interface IIcon {
  url: string
  onClick: () => void
}

const icons: IIcon[] = [
  {
    url: soccer,
    onClick: () => console.log('soccer')
  },
  {
    url: basketball,
    onClick: () => console.log('basketball')
  },
  {
    url: baseball,
    onClick: () => console.log('baseball')
  },
  {
    url: tennis,
    onClick: () => console.log('tennis')
  },
]
</script>

<div class='flex'>
  {#each icons as icon}
    <Icon {...icon} active={false} /> 
  {/each}
</div>
