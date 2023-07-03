<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initEnv, initInfo, initUserInfo, initOrdersInfo } from './context'
  import type { IChatroomEnv, IChatroomInfo, IUserInfo, IOrdersInfo } from './context'
  import type { SizeChangedCallback, ToggledCallback } from './type'

  let env = writable(initEnv)
  export const setChatEnv = (_env: Partial<IChatroomEnv>) => env.update((e) => ({ ...e, ..._env }))

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) =>
    info.update((e) => ({ ...e, ..._info }))

  let userInfo = writable(initUserInfo)
  export const setChatUserInfo = (_info: Partial<IUserInfo>) =>
    userInfo.update((e) => ({ ...e, ..._info }))

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function')
      return console.warn('onSizeChangedCallback parameter callback MUST be function')
    sizeChangedCallback = callback
  }

  let ordersInfo = writable(initOrdersInfo)
  export const setChatOrdersInfo = (_platformInfo: Partial<IOrdersInfo>) =>
    ordersInfo.update((e) => ({ ...e, ..._platformInfo }))
  
  let toggledCallback: ToggledCallback = () => {}
  export const onToggledCallback = (callback: ToggledCallback) => {
    if (typeof callback !== 'function')
      return console.warn('onToggledCallback parameter callback MUST be function')
    toggledCallback = callback
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { getConfig } from 'env-config'
  import { refererTools } from 'utils'
  import { im as impb } from 'protobuf'
  import { im as imWs } from 'api/wsMaster'
  import { t, locale } from '$stores'
  import { appHeight } from '$stores/layout'
  import BigNumber from 'bignumber.js'
  import type { IChatMessage } from 'api/im/types'

  import Empty from '$src/containers/Empty'

  import { setInfo, setEnv, setUserInfo, setOrdersInfo } from './context'
  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'
  import BetListSheet from '../BetListSheet/index.svelte'
  import { EChatroomSize } from './constant'


  const { chatId, iid, vipLimit, frequency } = setInfo($info)
  const { isOpen, displayType, height, size, showBetList, device, useScrollCollapse, animation } = setEnv($env)
  const { userAccount, userToken, userVip, userCurrency } = setUserInfo($userInfo)
  const { sportMarketSummary, selfOrdersCallback } = setOrdersInfo($ordersInfo)

  const subscribeStoreModule = () => {
    const envUnsubscribe = env.subscribe((e) => {
      displayType.set(e.displayType)
      height.set(e.height)
      size.set(e.size)
      isOpen.set(e.isOpen)
      device.set(e.device)
      showBetList.set(e.showBetList)
      useScrollCollapse.set(e.useScrollCollapse)
      animation.set(e.animation)
    })

    const userInfoUnsubscribe = userInfo.subscribe((e) => {
      userAccount.set(e.userAccount)
      userToken.set(e.userToken)
      userVip.set(e.userVip)
      userCurrency.set(e.userCurrency)
    })

    const infoUnsubscribe = info.subscribe((e) => {
      chatId.set(e.chatId)
      iid.set(e.iid)
      vipLimit.set(e.vipLimit)
      frequency.set(e.frequency)
    })

    const ordersInfoUnsubscribe = ordersInfo.subscribe(e => {
      sportMarketSummary.set(e.sportMarketSummary)
      selfOrdersCallback.set(e.selfOrdersCallback)
    })

    return () => {
      infoUnsubscribe()
      userInfoUnsubscribe()
      envUnsubscribe()
      ordersInfoUnsubscribe()
    }
  }

  const unsubscribeStoreModule = subscribeStoreModule()

  $: isWindow = $displayType === 'window'

  let lastReadId: number

  let subscription: ReturnType<typeof imWs.subscribe>
  let chatMessages = writable<IChatMessage[]>([])

  // TODO: subscribePushMessage has to move to upper level.
  const subscribePushMessage = () => {
    subscription = imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
      chatMessages.update((messages) => [...messages, data])
    })
  }

  const subscribeRoom = (_chatId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.SUBSCRIBE_CHAT,
      data: { chatIds: [String(_chatId)] }
    })
  }

  const unsubscribeRoom = (_chatId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
      data: { chatIds: [String(_chatId)] }
    })
  }

  let perviousChatId: string
  const subscribeNewAndUnsubscribePrevious = (_chatId: string) => {
    // TODO: 避免多次 subscribe，先暫不處理，待搬出upper level後處理
    if (_chatId === '0') return

    if (perviousChatId && perviousChatId !== _chatId) unsubscribeRoom(perviousChatId)
    subscribeRoom(_chatId)
    perviousChatId = _chatId
  }
  $: if ($chatId || String($iid)) subscribeNewAndUnsubscribePrevious($chatId || String($iid))

  let initFetchLoading: boolean = true

  const initChatroom = async () => {
    if (subscription) subscription.unsubscribe()
    subscribePushMessage()
    // TODO: 初次進入時 subscribe 會發生兩次，先暫不處理，待搬出upper level後處理
    subscribeNewAndUnsubscribePrevious($chatId || String($iid))
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: 0, chatId: $chatId || String($iid) }
    })
    res.data.pushMessageEntity.sort((a: any, b: any) => a.msgId - b.msgId)
    chatMessages.update((messages) => [...res.data.pushMessageEntity, ...messages])
    initFetchLoading = false
  }

  let isTransition = false
  let boxContainerDom: HTMLDivElement

  let startY: number
  let touchMoveOffset: number
  let isExpand: boolean = false
  const EXPAND_OFFSET = 100

  const expandChatroom = () => {
    isTransition = true
    toggledCallback && toggledCallback(true)
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
  }

  const foldChatroom = async () => {
    isTransition = true
    await tick() // for chatroom content chang to <Loading>
    toggledCallback && toggledCallback(false)
    touchMoveOffset = 0
    isWindow && window.scrollTo({ top: 0 })
    sizeChangedCallback &&
      sizeChangedCallback({ size: EChatroomSize.DEFAULT, transition: !isExpand })
    isExpand = false
  }

  const onTouchStart = (e: TouchEvent) => {
    if (!('touches' in e)) return

    startY = e.touches[0].clientY
  }

  const onTouchMove = (e: TouchEvent) => {
    if (!('touches' in e)) return

    const moveY = e.touches[0].clientY
    touchMoveOffset = startY - moveY
  }

  const initBodyHeight = () => {
    const vh = new BigNumber(window.innerHeight * 0.01).toFixed(2)
    appHeight.set(Number(vh))
  }

  const changeRoomSizeByTouchMove = (moveOffset: number) => {
    const scrollY = isWindow ? window.scrollY : boxContainerDom?.scrollTop

    if (!isExpand && moveOffset >= EXPAND_OFFSET) {
      isExpand = true
      sizeChangedCallback({ size: EChatroomSize.EXPAND, transition: true })
    } else if (isExpand && moveOffset <= -EXPAND_OFFSET && scrollY === 0) {
      isExpand = false
      sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
    }
  }

  const resetStoreModule = () => {
    setChatEnv(initEnv)

    setChatInfo({
      chatId: '',
      iid: 0
    })
  }

  $: changeRoomSizeByTouchMove(touchMoveOffset)

  // use 100 * $appHeight for compatibility between ios and android
  $: boxContainerHeight = `calc(100 * ${$appHeight}px - ${$height}px)`

  const setWebsocketAndActivity = (_account: string, _token: string) => {
    if (!$userAccount || !$userToken) {
      imWs.deactivate()
      $chatMessages = []
      return
    }

    imWs.setParams({
      account: _account,
      vd: getConfig().vendor_id,
      lang: $locale,
      referer: refererTools.getBase64()
    })
    imWs.setSubprotocols(_token)

    if (imWs.enabled) imWs.reconnect()
    else imWs.activate()
    initChatroom()
  }

  $: setWebsocketAndActivity($userAccount, $userToken)

  onMount(() => {
    initBodyHeight()
  })

  onDestroy(() => {
    if (subscription) subscription.unsubscribe()
    resetStoreModule()
    unsubscribeStoreModule()
  })
</script>

{#if !$isOpen}
  <Minimize {lastReadId} {chatMessages} on:click={expandChatroom} />
{:else}
  <div
    class={twMerge(
      'relative flex flex-1 flex-col bg-white',
      isWindow && isTransition && 'fixed w-full z-30 bottom-0'
    )}
    style:min-height={isWindow ? boxContainerHeight : '100%'}
    style:max-height={isWindow ? !isTransition ? 'none' : boxContainerHeight : '100%'}
    transition:fly|local={$animation && { y: isWindow ? 100 * $appHeight - $height : '100%', duration: 500 }}
    on:introend={() => {
      isTransition = false
    }}
    on:outroend={() => {
      isTransition = false
    }}
    on:touchstart={onTouchStart}
    on:touchmove={onTouchMove}
  >
    <Header {isTransition} fixed={isWindow} on:close={foldChatroom} />

    {#if initFetchLoading || isTransition}
      <Loading />
    {:else if $chatMessages.length === 0}
      <Empty class="flex-1" title={$t('chat.empty')} />
    {:else}
      <Messages
        bind:lastReadId
        {chatMessages}
        on:domBound={(e) => {
          boxContainerDom = e.detail
        }}
      />
    {/if}

    <InputArea fixed={isWindow} />

    <BetListSheet bind:open={$showBetList} />

    <div class='absolute inset-0 bg-white z-[-1]'></div>
  </div>
{/if}
