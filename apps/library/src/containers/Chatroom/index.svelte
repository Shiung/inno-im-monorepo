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
  import { twMerge } from 'tailwind-merge'
  import { onDestroy, /* tick */ } from 'svelte'
  import { defaultAllowTranslate, isTranslationFeatureOn, t } from '$stores'
  import { get } from 'svelte/store'
  import Portal from 'svelte-portal'
  import { isXl } from '$stores'

  import Empty from '$src/containers/Empty'

  import Container from './Container/index.svelte'
  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'
  import BetListSheet from '../BetListSheet/index.svelte'

  import { genId, subscribeRoom, unsubscribeRoom, getMessages, getHasVisibleMsgs } from './controller'
  import { setInfo, setOrdersInfo } from './context'
  import { EChatroomSize, CHATROOM_EXPAND_TRIGGER_DISTANCE } from './constant'
  import { showBetList } from './store'
  import { hasVisibleMsg } from './utils'

  const {
    displayType,
    useScrollCollapse,
    height,
    size,
    chatId,
    iid,
    showBetEnable,
    expandAnimation,
    header,
    headerClass,
    subscribeBindingChatroom
  } = setInfo($info)
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
      if (get(headerClass) !== e.headerClass) headerClass.set(e.headerClass)
      if (e.isDefaultTranslate !== null && get(defaultAllowTranslate) !== e.isDefaultTranslate) defaultAllowTranslate.set(e.isDefaultTranslate)
      if (get(isTranslationFeatureOn) !== e.isTranslationFeatureOn) isTranslationFeatureOn.set(Boolean(e.isTranslationFeatureOn))
      if (get(subscribeBindingChatroom) !== e.subscribeBindingChatroom) subscribeBindingChatroom.set(Boolean(e.subscribeBindingChatroom))
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

  let lastReadId: number
  let initFetchLoading: boolean = false
  let isTransition = false
  let boxContainerDom: HTMLDivElement
  let inputContainerDom: HTMLDivElement
  let touchMoveOffset: number
  let isExpand: boolean = false
  let isFocused: boolean = false

  let previous: { chatId: string; iid: number } = { chatId: '', iid: 0 }

  $: isWindow = $displayType === 'window'
  $: chatMessages = getMessages({ chatId: $chatId, iid: $iid })
  $: hasMsgs = getHasVisibleMsgs({ chatId: $chatId, iid: $iid })

  const expandChatroom = () => {
    isTransition = true
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
  }

  // unused now
  // const foldChatroom = async () => {
  //   isTransition = true
  //   await tick() // for chatroom content change to <Loading>
  //   touchMoveOffset = 0
  //   isWindow && window.scrollTo({ top: 0 })
  //   sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.DEFAULT, transition: !isExpand })
  //   isExpand = false
  // }

  const changeRoomSizeByTouchMove = (moveOffset: number) => {
    if (isFocused){
      return 
    }
    const scrollY = isWindow ? window.scrollY : (boxContainerDom?.scrollTop || 0)

    if (!isExpand && moveOffset >= CHATROOM_EXPAND_TRIGGER_DISTANCE) {
      isExpand = true
      sizeChangedCallback({ size: EChatroomSize.EXPAND, transition: true })
    } else if (isExpand && moveOffset <= -CHATROOM_EXPAND_TRIGGER_DISTANCE && scrollY === 0) {
      isExpand = false
      sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
    }
  }

  const onFocus = () => {
    inputContainerDom?.scrollIntoView({ block: 'end' })
    isFocused = true
  }

  const onBlur = () => {
    isFocused = false
  }

  const resetStoreModule = () => {
    setChatInfo({ ...initInfo })
    setChatOrdersInfo({ ...initOrdersInfo })
    showBetList.set(false)
  }

  $: changeRoomSizeByTouchMove(touchMoveOffset)

  $: if (!$hasMsgs) $hasMsgs = hasVisibleMsg($chatMessages)

  $: if ($size !== EChatroomSize.EXPAND && isExpand) isExpand = false

  const subscribeRoomAndUnsubscribePreviousIfNeeded = () => {
    const id = genId({ chatId: $chatId, iid: $iid })

    if (genId(previous) !== id) {
      unsubscribeRoom(previous)
      subscribeRoom({ chatId: $chatId, iid: $iid })
    }
    previous = { chatId: $chatId, iid: $iid }
  }

  $: if ($subscribeBindingChatroom && ($chatId || $iid)) subscribeRoomAndUnsubscribePreviousIfNeeded()

  onDestroy(() => {
    unsubscribeStoreModule()
    resetStoreModule()

    if($subscribeBindingChatroom) unsubscribeRoom(previous)
  })
</script>

<main class={twMerge("im-library", !isWindow && 'h-full')}>
  {#if $size === EChatroomSize.DEFAULT}
    <Minimize {lastReadId} {chatMessages} on:click={expandChatroom} />
  {:else}
    {#if $isXl}
      <BetListSheet bind:open={$showBetList} />
    {/if}

    <Container
      {isTransition}
      on:isTransitionChange={(e) => isTransition = e.detail }
      on:onTouchMoveChange={(e) => touchMoveOffset = e.detail }
    >
      <svelte:fragment slot='header'>
        <!-- <Header {isTransition} fixed={isWindow} on:close={foldChatroom} /> -->
        <Header {isTransition} fixed={isWindow} />
      </svelte:fragment>

      <svelte:fragment slot='messages'>
        {#if initFetchLoading || isTransition}
          <Loading />
        {:else if !$hasMsgs}
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
      </svelte:fragment>

      <svelte:fragment slot='input'>
          <div bind:this={inputContainerDom}>
            <InputArea fixed={isWindow} hasMsgs={$hasMsgs} onFocus={onFocus} onBlur={onBlur}/>
          </div>
      </svelte:fragment>

      {#if !$isXl}
        <BetListSheet bind:open={$showBetList} />
      {/if}
    </Container>
  {/if}
</main>
