<script lang="ts">
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { im as imWs } from 'api/wsMaster'
  import { im } from 'protobuf'
  import { t, type ITransStore, isTranslateOn, allowTranslate, isTranslationFeatureOn } from '$stores'

  import Send from '../images/send.svg'
  import ShowS from '../images/show_s.svg'
  import Translate from '../images/translate.svg'
  import Plus from '../images/plus.svg'

  import { EErrorCode, errorCodeMsgMap } from '../constant'
  import { getInfo } from '../context'
  import { userInfo, userAuth, type IUserInfo, type IUserAuth, goLoginCallback, goVipCenterCallback, goDepositCallback } from '$stores'
  import { chatroomSetting, type IChatroomSetting } from '../controller/localEnv'
  import { inputRect, inputAreaOffset, showBetList } from '../store'
  import { get } from 'svelte/store'

  export let fixed: boolean = false
  export let hasMsgs: boolean = false
  export let onFocus: () => void
  export let onBlur: () => void

  const { chatId, iid, showBetEnable } = getInfo()
  let placeHolder: string = ''
  let disabled: boolean = true
  let lastSend: number = 0
  let routerCallback: () => void

  $: setStatusAndCallbackByCondition($userInfo, $userAuth, $chatroomSetting, $t, hasMsgs)

  const setStatusAndCallbackByCondition = (
    userInfo: IUserInfo,
    userAuth: IUserAuth,
    chatroomSetting: IChatroomSetting,
    _t: ITransStore,
    hasMsgs: boolean
  ) => {
    resetStatus()

    const { userCurrency } = userInfo
    const { userToken } = userAuth

    if (!userToken) return setWithoutLogin(_t)

    if (chatroomSetting.errorCode !== 0) return setByChatSettingError(chatroomSetting, userCurrency, _t)

    setNormal(_t, hasMsgs)
  }

  const resetStatus = () => {
    placeHolder = ''
    disabled = true
    routerCallback = () => {}
  }

  const setWithoutLogin = (_t: ITransStore) => {
    placeHolder = _t('chat.needLogin')
    routerCallback = $goLoginCallback
    message = ''
  }

  const setByChatSettingError = (chatroomSetting: IChatroomSetting, userCurrency: IUserInfo['userCurrency'], _t: ITransStore) => {
    const { errorCode, vip, depositLimit } = chatroomSetting
    const _onCurrencyLimit = (depositLimit: IChatroomSetting['depositLimit'], userCurrency: string, _t: ITransStore) => {
      const limitRule = depositLimit.find((item) => item.currency === userCurrency)
      placeHolder = _t(errorCodeMsgMap[EErrorCode.CURRENCY_LIMIT], { currency: limitRule?.currency, amount: limitRule?.amount })
      routerCallback = $goDepositCallback
      message = ''
    }
    const _onVipLimit = (vip: IChatroomSetting['vip'], _t) => {
      placeHolder = _t(errorCodeMsgMap[EErrorCode.VIP_LIMIT], { vip })
      routerCallback = $goVipCenterCallback
      message = ''
    }

    switch (errorCode) {
      case EErrorCode.VIP_LIMIT:
        return _onVipLimit(vip, _t)
      case EErrorCode.CURRENCY_LIMIT:
        return _onCurrencyLimit(depositLimit, userCurrency, _t)
    }
  }

  const setNormal = (_t: ITransStore, hasMsgs: boolean) => {
    placeHolder = !hasMsgs ? _t('chat.empty') : ''
    disabled = false
    routerCallback = undefined
  }

  let dom: HTMLDivElement
  $: if (dom) inputRect.set(dom?.getBoundingClientRect())

  let message = ''
  $: trimmedMessage = message.trim()

  const publishMessage = async () => {
    if (!trimmedMessage) return
    const now = Date.now()
    if (now - lastSend <= $chatroomSetting.timeInterval) {
      return setWarningMsg(EErrorCode.TOO_OFTEN)
    }

    const data = {
      contentType: im.enum.contentType.CHAT,
      chatId: $chatId || String($iid),
      iid: $iid,
      // replyTo:
      content: trimmedMessage,
      ...($chatId && { houseId: $chatId })
    }

    message = ''
    const res = await imWs.publish({
      pairId: now,
      eventkey: im.enum.command.SEND_MESSAGE,
      data
    })

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
    const offset = (fixed ? ($inputRect?.height || 0) + 10 : 0) + warningHeight

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

  const toggleTranslation = () => {
    const isOn = get(isTranslateOn)
    allowTranslate.set(isOn ? 'not-allow' : 'allow')
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
      style:bottom={fixed && `${$inputRect?.height || 0}px`}
    >
      {warningMsg}
    </div>
  {/if}

  <div
    class={twMerge('im-shadow bottom-0 left-0 right-0 h-[50px] bg-white pt-[7px] px-[10px]', fixed ? 'fixed' : 'sticky')}
    bind:this={dom}
  >
    <div class="flex items-center">
      <div class="flex-1 flex items-center relative" on:click={onInputClick} on:keypress={onInputKeyPress}>
        <input
          class="h-[36px] w-full bg-[#f5f5f5] rounded-[22px] pl-[20px] pr-[40px] text-[14px] focus:outline-imprimary placeholder-[#c8c8c8] disabled:opacity-50"
          placeholder={placeHolder}
          {disabled}
          bind:value={message}
          maxlength="300"
          on:focus={onFocus}
          on:blur={onBlur}
        />

        {#if trimmedMessage.length > 0}
          <button
            class="absolute flex items-center justify-center rounded-full h-[26px] w-[26px] right-[10px]"
            disabled={disabled || !message}
            on:click={publishMessage}
          >
            <Send width={18} height={18} fill="rgb(var(--im-monorepo-primary))" />
          </button>
        {/if}

        {#if disabled}
          <div class="absolute h-full w-full" />
        {/if}
      </div>

      {#if $showBetEnable}
        <button class="flex items-center justify-center rounded-full h-[36px] w-[36px]" on:click={handleOrderClick}>
          <ShowS width={28} height={28} fill="#999999" />
        </button>
      {/if}

      {#if $isTranslationFeatureOn}
        <button class="flex items-center justify-center rounded-full h-[36px] w-[36px]" on:click={toggleTranslation}>
          <Translate width={28} height={28} fill={$isTranslateOn ? 'rgb(var(--im-monorepo-primary))' : '#999999'} />
        </button>
      {/if}

      <!-- <Ripple class="flex items-center justify-center rounded-full h-[36px] w-[36px]">
        <Plus width={28} height={28} fill="#999999" />
      </Ripple> -->
    </div>
  </div>

  <div style:height={fixed ? `${$inputRect?.height || 0}px` : 0} />
</div>
