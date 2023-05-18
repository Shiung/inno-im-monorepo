<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { fly } from 'svelte/transition'
import stomp from 'api/stompMaster'
import { Ripple } from 'ui'
import { t } from '$stores'

import Send from '../images/send.svg'
import ShowS from '../images/show_s.svg'
import Plus from '../images/plus.svg'

export let fixed: boolean = true
export let userId: string
export let userVip: number
export let subId: string
export let destination: string
export let isLogin: boolean
export let isCharged: boolean
export let vipLimit: number
export let frequency: number

let placeHolder: string = ''
let disabled: boolean = true
let lastSend: number = 0

$: {
  if (!isLogin) placeHolder = $t('chat.needLogin')
  else if (!isCharged) placeHolder = $t('chat.needCharge')
  else if (userVip < vipLimit) placeHolder = $t('chat.needVip', { vip: vipLimit })
  else {
    placeHolder = $t('chat.normalPlaceholder')
    disabled = false
  }
}

let dom: HTMLDivElement
$: blockHeight = dom?.getBoundingClientRect().height

let message: string
let showTooOften: boolean = false
let timeout: ReturnType<typeof setTimeout>
$: if (showTooOften) {
  clearTimeout(timeout) 
  timeout = setTimeout(() => showTooOften = false, 3000)
}

const publishMessage = () => {
  if (!message) return
  const now = Date.now()
  if (now - lastSend <= frequency) return showTooOften = true

  lastSend = now
  stomp.publish({ destination, headers: { id: subId }, body: JSON.stringify({ message, userId }) })
  message = ''
}

</script>

<div>
  {#if showTooOften}
    <div transition:fly|local={{ y: 32 }}
      class='flex items-center px-[15px] bg-imprimary text-[12px] text-white h-[32px]'
    >
      {$t('chat.tooOften')}
    </div>
  {/if}

  <div class={twMerge(
    'im-shadow bottom-0 left-0 right-0 h-[83px] bg-white pt-[8px] px-[10px]',
    fixed ? 'fixed' : 'sticky'
  )}
    bind:this={dom}
  >
    <div class='flex items-center'>

      <div class='flex-1 flex items-center relative'>
        <input 
          class='h-[36px] w-full bg-[#F5F5F5] rounded-[22px] pl-[20px] pr-[40px] text-[14px] focus:outline-imprimary'
          placeholder={placeHolder}
          disabled={disabled}
          bind:value={message}
          maxlength="300"
        />

        <Ripple class='absolute flex items-center justify-center rounded-full h-[26px] w-[26px] right-[10px]'
          disabled={!message}
          on:click={publishMessage}
        >
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

  <div style:height={fixed && `${blockHeight}px`}/>
</div>
