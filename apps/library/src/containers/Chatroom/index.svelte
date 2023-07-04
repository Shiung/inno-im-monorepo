<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initInfo, initOrdersInfo } from './context'
  import type { IChatroomInfo, IOrdersInfo } from './context'
  import type { SizeChangedCallback, ToggledCallback } from './type'

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) => info.update((e) => ({ ...e, ..._info }))

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function') return console.warn('onSizeChangedCallback parameter callback MUST be function')
    sizeChangedCallback = callback
  }

  let ordersInfo = writable(initOrdersInfo)
  export const setChatOrdersInfo = (_platformInfo: Partial<IOrdersInfo>) => ordersInfo.update((e) => ({ ...e, ..._platformInfo }))

  let toggledCallback: ToggledCallback = () => {}
  export const onToggledCallback = (callback: ToggledCallback) => {
    if (typeof callback !== 'function') return console.warn('onToggledCallback parameter callback MUST be function')
    toggledCallback = callback
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { t } from '$stores'
  import { appHeight } from '$stores/layout'
  import BigNumber from 'bignumber.js'

  import Empty from '$src/containers/Empty'

  import { genId, subscribeRoom, unsubscribeRoom, getMessages, chatEnv } from './controller'
  import { setInfo, setOrdersInfo } from './context'

  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'
  import BetListSheet from '../BetListSheet/index.svelte'
  import { EChatroomSize } from './constant'

  const { displayType, useScrollCollapse, height, isOpen, showBetList, chatId, iid } = setInfo($info)
  const { sportMarketSummary, selfOrdersCallback, followOrdersCallback } = setOrdersInfo($ordersInfo)

  const subscribeStoreModule = () => {
    const infoUnsubscribe = info.subscribe((e) => {
      displayType.set(e.displayType)
      useScrollCollapse.set(e.useScrollCollapse)
      height.set(e.height)
      isOpen.set(e.isOpen)
      showBetList.set(e.showBetList)
      chatId.set(e.chatId)
      iid.set(e.iid)
    })

    const ordersInfoUnsubscribe = ordersInfo.subscribe((e) => {
      sportMarketSummary.set(e.sportMarketSummary)
      selfOrdersCallback.set(e.selfOrdersCallback)
      followOrdersCallback.set(e.followOrdersCallback)
    })

    return () => {
      infoUnsubscribe()
      ordersInfoUnsubscribe()
    }
  }

  const unsubscribeStoreModule = subscribeStoreModule()

  $: isWindow = $displayType === 'window'

  let lastReadId: number

  $: chatMessages = getMessages({ chatId: $chatId, iid: $iid })

  let initFetchLoading: boolean = false

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
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.DEFAULT, transition: !isExpand })
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
    setChatInfo(initInfo)
  }

  $: changeRoomSizeByTouchMove(touchMoveOffset)

  // use 100 * $appHeight for compatibility between ios and android
  $: boxContainerHeight = `calc(100 * ${$appHeight}px - ${$height}px)`

  let previous: { chatId: string; iid: number }
  const subscribeRoomAndUnsubscribePreviousIfNeeded = () => {
    const id = genId({ chatId: $chatId, iid: $iid })
    if (previous && genId(previous) !== id) unsubscribeRoom(previous)
    subscribeRoom({ chatId: $chatId, iid: $iid })
    previous = { chatId: $chatId, iid: $iid }
  }

  $: if ($chatEnv.subscribeBindingChatroom && ($chatId || $iid)) subscribeRoomAndUnsubscribePreviousIfNeeded()
  $: isPC = $chatEnv.device === 'pc'

  onMount(() => {
    initBodyHeight()
  })

  onDestroy(() => {
    resetStoreModule()
    unsubscribeStoreModule()
  })
</script>

{#if !$isOpen}
  <Minimize {lastReadId} {chatMessages} on:click={expandChatroom} />
{:else}
  <div
    class={twMerge('relative flex flex-1 flex-col bg-white', isWindow && isTransition && 'fixed w-full z-30 bottom-0')}
    style:min-height={isWindow ? boxContainerHeight : '100%'}
    style:max-height={isWindow ? (!isTransition ? 'none' : boxContainerHeight) : '100%'}
    transition:fly|local={!isPC && { y: isWindow ? 100 * $appHeight - $height : '100%', duration: 500 }}
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

    <div class="absolute inset-0 bg-white z-[-1]" />
  </div>
{/if}
