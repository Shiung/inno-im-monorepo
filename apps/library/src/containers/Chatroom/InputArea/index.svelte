<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  // import stomp from 'api/stompMaster'
  import { im as imWs } from 'api/wsMaster'
  import { im } from 'protobuf'
  import { Ripple } from 'ui'
  import { t } from '$stores'

  import Send from '../images/send.svg'
  import ShowS from '../images/show_s.svg'
  import Plus from '../images/plus.svg'

  import { getInfo } from '../context'

  export let fixed: boolean = true
  export let destination: string
  export let subId: string

  const { userId, isLogin, isCharged, userVip, vipLimit, frequency } = getInfo()

  let placeHolder: string = ''
  let disabled: boolean = true
  let lastSend: number = 0

  $: {
    if (!$isLogin) placeHolder = $t('chat.needLogin')
    else if (!$isCharged) placeHolder = $t('chat.needCharge')
    else if ($userVip < $vipLimit) placeHolder = $t('chat.needVip', { vip: $vipLimit })
    else {
      placeHolder = $t('chat.normalPlaceholder')
      disabled = false
    }
  }

  let dom: HTMLDivElement
  $: blockHeight = dom?.getBoundingClientRect().height

  $: if (dom) dispatch('domInit', blockHeight)

  const dispatch = createEventDispatcher()

  let message: string

  const publishMessage = () => {
    if (!message) return
    const now = Date.now()
    if (now - lastSend <= $frequency) {
      return dispatch('warningInput', 30003)
    }

    imWs.publish({
      eventkey: im.enum.command.SEND_MESSAGE,
      data: {
        contentType: im.enum.contentType.CHAT,
        chatId: 'chatid124',
        iid: 1234,
        // replyTo:
        content: message
      }
    })

    lastSend = now
    message = ''
  }
</script>

<div class='relative'>
  <slot name='warningTips'></slot>

  <div
    class={twMerge(
      'im-shadow bottom-0 left-0 right-0 h-[83px] bg-white pt-[8px] px-[10px]',
      fixed ? 'fixed' : 'sticky'
    )}
    bind:this={dom}
  >
    <div class="flex items-center">
      <div class="flex-1 flex items-center relative">
        <input
          class="h-[36px] w-full bg-[#F5F5F5] rounded-[22px] pl-[20px] pr-[40px] text-[14px] focus:outline-imprimary"
          placeholder={placeHolder}
          {disabled}
          bind:value={message}
          maxlength="300"
        />

        <Ripple
          class="absolute flex items-center justify-center rounded-full h-[26px] w-[26px] right-[10px]"
          disabled={!message}
          on:click={publishMessage}
        >
          <Send width={18} height={18} fill="rgb(var(--im-monorepo-primary))" />
        </Ripple>
      </div>

      <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]">
        <ShowS width={28} height={28} fill="#999999" />
      </Ripple>
      <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]">
        <Plus width={28} height={28} fill="#999999" />
      </Ripple>
    </div>
  </div>

  <div style:height={fixed && `${blockHeight}px`} />
</div>
