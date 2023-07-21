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
  import { t, type ITransStore } from '$stores'

  import Send from '../images/send.svg'
  import ShowS from '../images/show_s.svg'
  import Plus from '../images/plus.svg'

  import { EErrorCode, errorCodeMsgMap } from '../constant'
  import { getInfo } from '../context'
  import { userInfo, userAuth, type IUserInfo, type IUserAuth } from '$stores'
  import { chatroomSetting, type IChatroomSetting } from '../controller/localEnv'
  import { inputRect, inputAreaOffset } from '../store'

  export let fixed: boolean = false

  const { chatId, iid, showBetList } = getInfo()
  let placeHolder: string = ''
  let disabled: boolean = true
  let lastSend: number = 0
  let routerCallback: () => void

  $: setStatusAndCallbackByCondition($userInfo, $userAuth, $chatroomSetting, $t)

  const setStatusAndCallbackByCondition = (userInfo: IUserInfo, userAuth: IUserAuth, chatroomSetting: IChatroomSetting, _t: ITransStore) => {
    resetStatus()

    const { userCurrency } = userInfo
    const { userToken } = userAuth

    if (!userToken) return setWithoutLogin(_t)

    if (chatroomSetting.errorCode !== 0) return setByChatSettingError(chatroomSetting, userCurrency, _t)

    setNormal(_t)
  }

  const resetStatus = () => {
    placeHolder = ''
    disabled = true
    routerCallback = () => {}
  }

  const setWithoutLogin = (_t: ITransStore) => {
    placeHolder = _t('chat.needLogin')
    routerCallback = () => routerRedirectCallback({ location: 'login' })
    message = ''
  }

  const setByChatSettingError = (chatroomSetting: IChatroomSetting, userCurrency: IUserInfo['userCurrency'], _t: ITransStore) => {
    const { errorCode, vip, depositLimit } = chatroomSetting
    const _onCurrencyLimit = (depositLimit: IChatroomSetting['depositLimit'], userCurrency: string, _t: ITransStore) => {
      const limitRule = depositLimit.find(item => item.currency === userCurrency)
      placeHolder = _t(errorCodeMsgMap[EErrorCode.CURRENCY_LIMIT], { currency: limitRule?.currency, amount: limitRule?.amount})
      routerCallback = () => routerRedirectCallback({ location: 'deposit' })
      message = ''
    }
    const _onVipLimit = (vip: IChatroomSetting['vip'], _t) => {
      placeHolder = _t(errorCodeMsgMap[EErrorCode.VIP_LIMIT], { vip })
      routerCallback = () => routerRedirectCallback({ location: 'vipCenter' })
      message = ''
    }

    switch(errorCode) {
      case EErrorCode.VIP_LIMIT: return _onVipLimit(vip, _t)
      case EErrorCode.CURRENCY_LIMIT: return _onCurrencyLimit(depositLimit, userCurrency, _t)
    }
  }

  const setNormal = (_t: ITransStore) => {
    placeHolder = _t('chat.normalPlaceholder')
    disabled = false
    routerCallback = undefined
  }

  let dom: HTMLDivElement
  $: if (dom) inputRect.set(dom?.getBoundingClientRect())

  let message: string

  const publishMessage = async () => {
    if (!message) return
    const now = Date.now()
    if (now - lastSend <= $chatroomSetting.timeInterval) {
      return setWarningMsg(EErrorCode.TOO_OFTEN)
    }

    const waitSendMessage = message

    const data = {
      contentType: im.enum.contentType.CHAT,
      chatId: $chatId || String($iid),
      iid: $iid,
      // replyTo:
      content: waitSendMessage,
      ...($chatId && { houseId: $chatId })
    }

    message = ''
    const res = await imWs.publish({
      pairId: now,
      eventkey: im.enum.command.SEND_MESSAGE,
      data
    })

    console.log('publish res: ', res)

    if (res.code !== 0) setWarningMsg(res.code, res.msg)

    lastSend = now
  }

  let warningMsg: string
  let showWarning: boolean = false
  const setWarningMsg = (code: number, message?: string) => {
    const mapped = EErrorCode?.[code]
    warningMsg = mapped ? $t(errorCodeMsgMap[code]) : message
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
    const offset = (fixed ? $inputRect?.height + 10 : 0) + warningHeight

    inputAreaOffset.set(offset)
  }

  let timeout: ReturnType<typeof setTimeout>
  $: if (showWarning) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      showWarning = false
    }, 2000)
  }

  const handleOrderClick = () => {    
    if (disabled) routerCallback && routerCallback()
    else $showBetList = true
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
      style:bottom={fixed && `${$inputRect?.height}px`}
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
          disabled={disabled || !message}
          on:click={publishMessage}
        >
          <Send width={18} height={18} fill="rgb(var(--im-monorepo-primary))" />
        </Ripple>
      </div>

      <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]" on:click={handleOrderClick}>
        <ShowS width={28} height={28} fill="#999999" />
      </Ripple>
      <!-- <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]">
        <Plus width={28} height={28} fill="#999999" />
      </Ripple> -->
    </div>
  </div>

  <div style:height={fixed && `${$inputRect?.height}px`} />
</div>
