<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import empty from './empty.png'

export let alt: string = ''
export let title: string = ''
</script>

<div class={twMerge('flex flex-col justify-center items-center text-[18px] text-[#dddddd] text-center', $$props.class)}>
  <img src={empty} alt={alt} />
  <div> {title} </div>
</div>
