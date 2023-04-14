<script lang='ts'>
import { Ripple } from 'ui'
import { twMerge } from 'tailwind-merge'

export let url: string
export let onClick: () => void
export let active: boolean
</script>

<Ripple class={twMerge(
    'w-[30px] h-[30px] im-shadow flex rounded-full justify-center items-center border mr-[10px] last:mr-0',
    active ? 'border-primary' : 'border-white'
  )}
  on:click={onClick}
>
  <img class='w-[18px] h-[18px]' src={url} alt='' />
</Ripple>
