<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initEnv, initInfo, initUserInfo } from './context'
  import type { IChatroomEnv, IChatroomInfo, IUserInfo } from './context'
  import type { SizeChangedCallback, ToggledCallback, DestroyedCallback } from './type'

  let env = writable(initEnv)
  export const setChatEnv = (_env: Partial<IChatroomEnv>) => env.update((e) => ({ ...e, ..._env }))

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) => info.update((e) => ({ ...e, ..._info }))

  let userInfo = writable(initUserInfo)
  export const setChatUserInfo = (_info: Partial<IUserInfo>) => userInfo.update((e) => ({ ...e, ..._info }))

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function') return console.warn('onSizeChangedCallback parameter callback MUST be function')
    sizeChangedCallback = callback
  }

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
  import { im as impb } from 'protobuf'
  import { im as imWs } from 'api/wsMaster'
  import { t } from '$stores'
  import { appHeight } from '$stores/layout'
  import BigNumber from 'bignumber.js'
  import type { IChatMessage } from 'api/im/types'

  import Empty from '$src/containers/Empty'

  import { setInfo, setEnv, setUserInfo } from './context'
  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'
  import { EChatroomSize } from './constant'

  const { chatId, iid, vipLimit, frequency } = setInfo($info)
  const { isOpen, displayType, height, size } = setEnv($env)
  const { userAccount, userToken, userVip } = setUserInfo($userInfo)
  
  env.subscribe(e => {
    displayType.set(e.displayType)
    height.set(e.height)
    size.set(e.size)
    isOpen.set(e.isOpen)
  })

  userInfo.subscribe(e => {
    userAccount.set(e.userAccount)
    userToken.set(e.userToken)
    userVip.set(e.userVip)
  })

  info.subscribe(e => {
    chatId.set(e.chatId)
    iid.set(e.iid)
    vipLimit.set(e.vipLimit)
    frequency.set(e.frequency)
  })

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
      data: { chatIds: [String($chatId)] }
    })
  }

  const unsubscribeRoom = (_chatId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
      data: { chatIds: [String($chatId)] }
    })
  }

  let perviousChatId: string
  const subscribeNewAndUnsubscribePrevious = (_chatId: string) => {
    if (perviousChatId && perviousChatId !== _chatId) unsubscribeRoom(perviousChatId)
    subscribeRoom(_chatId)
    perviousChatId = _chatId
  }

  $: if ($chatId) subscribeNewAndUnsubscribePrevious($chatId)

  let initFetchLoading: boolean = true

  const initChatroom = async () => {
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: 0, chatId: $chatId }
    })
    console.log('FETCH_MESSAGES: ', res)
    // chatMessages.update((messages) => [...res.data.list, ...messages])
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
    setChatEnv({
      displayType: 'window',
      height: 0,
      isOpen: false,
      size: 'default'
    })

    setChatInfo({
      chatId: '',
      iid: 0
    })
  }

  $: changeRoomSizeByTouchMove(touchMoveOffset)

  // use 100 * $appHeight for compatibility between ios and android
  $: boxContainerHeight = `calc(100 * ${$appHeight}px - ${$height}px)`

  onMount(() => {
    // TODO: change to real data.
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiZmM4NzU3MWYtNDQzZS00MDI0LWE1NGMtZjEyNTkwMWY3Y2E5IiwidmVuZG9ySWQiOjEsInR5cGUiOjEsInVzZXJJZCI6MzA3Njg3LCJsb2dpbkRvbWFpbiI6ImVuLXZkMDAxLXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg3NzUyNzMyMDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMTU0MDk2MDAwLCJ2ZW5kb3IiOiJkdjIiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJibHRlc3QwMSJ9.T4wC3cLQP1QtQOUKs8pX7sFd0TxAd7VzBep9_dLzFfk'
    const referer = 'aHR0cHM6Ly9lbi12ZDAwMS10aWdlci1wb3J0YWwuaW5ub2Rldi5zaXRlLw=='

    imWs.setParams({ account: 'bltest01', vd: 1, lang: 'zh_CN', referer: referer })
    imWs.setSubprotocols(token)
    imWs.activate()

    initBodyHeight()
    initChatroom()
    subscribePushMessage()
  })

  onDestroy(() => {
    if (subscription) subscription.unsubscribe()
    resetStoreModule()
  })
</script>

<div
  data-cid="Chatroom"
  class={twMerge(!isWindow && 'fixed w-full transition-[top] duration-300')}
  style:top={!isWindow ? `${$height}px` : ''}
>
  {#if !$isOpen}
    <Minimize {lastReadId} {chatMessages} on:click={expandChatroom} />
  {:else}
    <div
      class={twMerge('relative flex-1 flex flex-col bg-white', isTransition && 'fixed w-full z-30 bottom-0')}
      style:min-height={boxContainerHeight}
      style:max-height={isWindow && !isTransition ? 'none' : boxContainerHeight}
      transition:fly|local={{ y: 100 * $appHeight - $height, duration: 500 }}
      on:introend={() => {
        isTransition = false
      }}
      on:outroend={() => {
        isTransition = false
      }}
      on:touchstart={onTouchStart}
      on:touchmove={onTouchMove}
    >
      <Header {isTransition} on:close={foldChatroom} />

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

      <InputArea />

      <div class='absolute inset-0 bg-white z-[-1]'></div>
    </div>
  {/if}
</div>
