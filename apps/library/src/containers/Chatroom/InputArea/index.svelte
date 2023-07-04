<script lang="ts" context="module">
  import type { RouterRedirectCallback } from '../type'
  let routerRedirectCallback: RouterRedirectCallback = () => {}
  export const onRouterRedirectCallback = (callback: RouterRedirectCallback) => {
    if (typeof callback !== 'function') return console.warn('onRouterRedirect parameter callback MUST be function')
    routerRedirectCallback = callback
  }
</script>

<script lang="ts">
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { im as imWs } from 'api/wsMaster'
  import { im } from 'protobuf'
  import { Ripple } from 'ui'
  import { t } from '$stores'

  import Send from '../images/send.svg'
  import ShowS from '../images/show_s.svg'
  import Plus from '../images/plus.svg'

  import { warningCodeMap } from '../constant'
  import { getInfo } from '../context'
  import { userInfo, chatEnv } from '../controller'
  import { inputAreaOffset } from './store'

  export let fixed: boolean = false

  const { chatId, iid, showBetList } = getInfo()

  let placeHolder: string = ''
  let disabled: boolean = true
  let lastSend: number = 0
  let routerCallback: () => void

  $: {
    disabled = true
    if (!$userInfo.userToken) {
      placeHolder = $t('chat.needLogin')
      routerCallback = () => routerRedirectCallback({ location: 'login' })
    }
    // TODO: deposit limit check
    else if ($userInfo.userVip < $chatEnv.vipLimit) {
      placeHolder = $t('chat.needVip', { vip: $chatEnv.vipLimit })
      routerCallback = () => routerRedirectCallback({ location: 'vipCenter' })
    } else {
      placeHolder = $t('chat.normalPlaceholder')
      disabled = false
      routerCallback = undefined
    }
  }

  let dom: HTMLDivElement
  $: blockHeight = dom?.getBoundingClientRect().height

  let message: string

  const publishMessage = async () => {
    if (!message) return
    const now = Date.now()
    if (now - lastSend <= $chatEnv.frequency) {
      return setWarningMsg(4005)
    }

    const waitSendMessage = message

    const data = {
      contentType: im.enum.contentType.CHAT,
      chatId: $chatId || String($iid),
      iid: $iid,
      // replyTo:
      content: waitSendMessage
    }

    message = ''
    const res = await imWs.publish({
      pairId: now,
      eventkey: im.enum.command.SEND_MESSAGE,
      data
    })

    console.log('publish res: ', res)

    if (res.code !== 0) setWarningMsg(res.code)

    lastSend = now
  }

  let warningMsg: string
  let showWarning: boolean = false
  const setWarningMsg = (code: string | number) => {
    const msgKey = warningCodeMap?.[code]
    if (msgKey) warningMsg = $t(msgKey)
    showWarning = true
  }

  const onInputClick = () => {
    if (!disabled) return

    routerCallback && routerCallback()
  }

  const onInputKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      publishMessage()
    }
  }

  $: {
    const warningHeight = showWarning ? 32 : 0
    const offset = (fixed ? blockHeight + 10 : 0) + warningHeight

    inputAreaOffset.set(offset)
  }

  let timeout: ReturnType<typeof setTimeout>
  $: if (showWarning) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      showWarning = false
    }, 2000)
  }
</script>

<div class="relative">
  {#if showWarning}
    <div
      transition:fly|local={{ y: 32 }}
      class={twMerge(
        'flex items-center px-[15px] bg-imprimary text-[12px] text-white h-[32px] w-full',
        fixed ? 'fixed' : 'absolute -translate-y-full'
      )}
      style:bottom={fixed && `${blockHeight}px`}
    >
      {warningMsg}
    </div>
  {/if}

  <div
    class={twMerge('im-shadow bottom-0 left-0 right-0 h-[83px] bg-white pt-[8px] px-[10px]', fixed ? 'fixed' : 'sticky')}
    bind:this={dom}
  >
    <div class="flex items-center">
      <div class="flex-1 flex items-center relative" on:click={onInputClick} on:keypress={onInputKeyPress}>
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

      <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]" on:click={() => ($showBetList = true)}>
        <ShowS width={28} height={28} fill="#999999" />
      </Ripple>
      <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]">
        <Plus width={28} height={28} fill="#999999" />
      </Ripple>
    </div>
  </div>

  <div style:height={fixed && `${blockHeight}px`} />
</div>
