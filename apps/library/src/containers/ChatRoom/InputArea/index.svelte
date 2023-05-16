<script lang='ts'>
import { Ripple } from 'ui'
import Send from '../images/send.svg'
import ShowS from '../images/show_s.svg'
import Plus from '../images/plus.svg'

let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height
</script>

<div>
  <div class='fixed im-shadow bottom-0 left-0 right-0 h-[83px] bg-white' bind:this={dom}>
    <div class='flex items-center'>
      <Ripple class='flex items-center justify-center rounded-full h-[26px] w-[26px]'>
        <Send width={18} height={18} fill='rgb(var(--im-monorepo-primary))'/>
      </Ripple>
      <Ripple class='flex items-center justify-center rounded-full h-[36px] w-[36px]'>
        <ShowS width={28} height={28} fill='#999999' />
      </Ripple>
      <Ripple class='flex items-center justify-center rounded-full h-[36px] w-[36px]'>
        <Plus width={28} height={28} fill='#999999' />
      </Ripple>
    </div>
  </div>

  <div style:height={`${blockHeight}px`}/>
</div>
