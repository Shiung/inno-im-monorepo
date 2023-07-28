<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initInfo, initOrdersInfo } from './context'
  import type { IChatroomInfo, IOrdersInfo } from './context'
  import type { SizeChangedCallback } from './type'

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) => {
    info.update((e) => ({ ...e, ..._info }))
  }

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function') return console.warn('onSizeChangedCallback parameter callback MUST be function')
    sizeChangedCallback = callback
  }

  let ordersInfo = writable(initOrdersInfo)
  export const setChatOrdersInfo = (_platformInfo: Partial<IOrdersInfo>) => ordersInfo.update((e) => ({ ...e, ..._platformInfo }))

</script>

<script lang="ts">
  import { onDestroy, tick } from 'svelte'
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { t } from '$stores'
  import { get } from 'svelte/store'

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
  import { showBetList } from './store'

  const { displayType, useScrollCollapse, height, size, chatId, iid, showBetEnable, expandAnimation, header } = setInfo($info)
  const { sportMarketSummary, selfOrdersCallback, followOrdersCallback } = setOrdersInfo($ordersInfo)

  const subscribeStoreModule = () => {
    const infoUnsubscribe = info.subscribe((e) => {
      if (get(displayType) !== e.displayType) displayType.set(e.displayType)
      if (get(useScrollCollapse) !== e.useScrollCollapse) useScrollCollapse.set(e.useScrollCollapse)
      if (get(height) !== e.height) height.set(e.height)
      if (get(showBetEnable) !== e.showBetEnable) showBetEnable.set(e.showBetEnable)
      if (get(size) !== e.size) size.set(e.size)
      if (get(chatId) !== e.chatId) chatId.set(e.chatId)
      if (get(iid) !== e.iid) iid.set(e.iid)
      if (get(expandAnimation) !== e.expandAnimation) expandAnimation.set(e.expandAnimation)
      if (get(header) !== e.header) header.set(e.header)
    })

    const ordersInfoUnsubscribe = ordersInfo.subscribe((e) => {
      if (get(sportMarketSummary) !== e.sportMarketSummary) sportMarketSummary.set(e.sportMarketSummary)
      if (get(selfOrdersCallback) !== e.selfOrdersCallback) selfOrdersCallback.set(e.selfOrdersCallback)
      if (get(followOrdersCallback) !== e.followOrdersCallback) followOrdersCallback.set(e.followOrdersCallback)
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

  let previous: { chatId: string; iid: number } = { chatId: '', iid: 0 }

  const expandChatroom = () => {
    isTransition = true
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
  }

  const foldChatroom = async () => {
    isTransition = true
    await tick() // for chatroom content chang to <Loading>
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
    setChatInfo({ ...initInfo })
    setChatOrdersInfo({ ...initOrdersInfo })
  }

  $: changeRoomSizeByTouchMove(touchMoveOffset)

  // use window.innerHeight for compatibility between ios and android
  $: boxContainerHeight = `${window.innerHeight - $height}px`

  const subscribeRoomAndUnsubscribePreviousIfNeeded = () => {
    const id = genId({ chatId: $chatId, iid: $iid })

    if (genId(previous) !== id) {
      unsubscribeRoom(previous)
      subscribeRoom({ chatId: $chatId, iid: $iid })
    }
    previous = { chatId: $chatId, iid: $iid }
  }

  $: if ($chatEnv.subscribeBindingChatroom && ($chatId || $iid)) subscribeRoomAndUnsubscribePreviousIfNeeded()

  onDestroy(() => {
    unsubscribeStoreModule()
    resetStoreModule()
    if($chatEnv.subscribeBindingChatroom) {
      unsubscribeRoom(previous)
    }
    previous = { chatId: '', iid: 0 }
  })
</script>

{#if $size === EChatroomSize.DEFAULT}
  <Minimize {lastReadId} {chatMessages} on:click={expandChatroom} />
{:else}
  <div
    class={twMerge('relative flex flex-1 flex-col bg-white', isWindow && isTransition && 'fixed w-full z-30 bottom-0')}
    style:min-height={isWindow ? boxContainerHeight : '100%'}
    style:max-height={isWindow ? (!isTransition ? 'none' : boxContainerHeight) : '100%'}
    transition:fly|local={$expandAnimation && { y: isWindow ? window.innerHeight - $height : '100%', duration: 500 }}
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
