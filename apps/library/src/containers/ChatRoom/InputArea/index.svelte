<script lang='ts'>
import stomp, { activate } from 'api/stompMaster'
import { Ripple } from 'ui'

import Send from '../images/send.svg'
import ShowS from '../images/show_s.svg'
import Plus from '../images/plus.svg'

export let userId: string
export let subId: string
export let destination: string

let dom: HTMLDivElement
// $: blockHeight = dom?.getBoundingClientRect().height

let message: string

const publishMessage = () => {
  stomp.publish({ destination, headers: { id: subId }, body: JSON.stringify({ message, userId }) })
  message = ''
}

</script>

<div>
  <div class='im-shadow bottom-0 left-0 right-0 h-[83px] bg-white pt-[8px] px-[10px]' bind:this={dom}>
    <div class='flex items-center'>

      <div class='flex-1 flex items-center relative'>
        <input 
          class='h-[36px] w-full bg-[#F5F5F5] rounded-[22px] pl-[20px] pr-[40px] text-[14px] focus:outline-imprimary'
           bind:value={message}
         />

        <Ripple class='absolute flex items-center justify-center rounded-full h-[26px] w-[26px] right-[10px]' on:click={publishMessage}>
          <Send width={18} height={18} fill='rgb(var(--im-monorepo-primary))'/>
        </Ripple>
      </div>

      <Ripple class='flex items-center justify-center rounded-full h-[36px] w-[36px]'>
        <ShowS width={28} height={28} fill='#999999' />
      </Ripple>
      <Ripple class='flex items-center justify-center rounded-full h-[36px] w-[36px]'>
        <Plus width={28} height={28} fill='#999999' />
      </Ripple>
    </div>
  </div>

  <!--<div style:height={`${blockHeight}px`}/>-->
</div>
