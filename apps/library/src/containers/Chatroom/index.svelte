<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initEnv, initInfo } from './context'
  import type { IChatroomEnv, IChatroomInfo } from './context'
  import type { SizeChangedCallback, ToggleCallback } from './type'

  let env = writable(initEnv)
  export const setChatEnv = (_env: Partial<IChatroomEnv>) => env.update((e) => ({ ...e, ..._env }))

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) => info.update((e) => ({ ...e, ..._info }))

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function')
      return console.warn('onSizeChangedCallback callback MUST be function')
    sizeChangedCallback = callback
  }

  let toggleCallback: ToggleCallback = () => {}
  export const onToggledCallback = (callback: ToggleCallback) => {
    toggleCallback = callback
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

  import Empty from '$src/containers/Empty'

  import { setInfo, setEnv } from './context'
  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'

  import { EChatroomSize } from './constant'

  const { roomId } = setInfo($info)
  const { isOpen, displayType, height, size } = setEnv($env)
  
  env.subscribe(e => {
    displayType.set(e.displayType)
    height.set(e.height)
    size.set(e.size)
    isOpen.set(e.isOpen)
  })

  $: setInfo($info)

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

  const subscribeRoom = (_roomId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.SUBSCRIBE_CHAT,
      data: { chatIds: [String($roomId)] }
    })
  }

  const unsubscribeRoom = (_roomId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
      data: { chatIds: [String($roomId)] }
    })
  }

  let perviousRoomId: string
  const subscribeNewAndUnsubscribePrevious = (_roomId: string) => {
    if (perviousRoomId && perviousRoomId !== _roomId) unsubscribeRoom(perviousRoomId)
    subscribeRoom(_roomId)
    perviousRoomId = _roomId
  }

  $: if ($roomId) subscribeNewAndUnsubscribePrevious($roomId)

  let initFetchLoading: boolean = true

  const initChatroom = async () => {
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: 0, chatId: $roomId }
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
    toggleCallback && toggleCallback(true)
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
  }

  const foldChatroom = async () => {
    isTransition = true
    await tick() // for chatroom content chang to <Loading>
    toggleCallback && toggleCallback(false)
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

  // for changing chatroom size to EXPAND/NORMAL
  $: {
    const scrollY = isWindow ? window.scrollY : boxContainerDom?.scrollTop

    if (!isExpand && touchMoveOffset >= EXPAND_OFFSET) {
      isExpand = true
      sizeChangedCallback({ size: EChatroomSize.EXPAND, transition: true })
    } else if (isExpand && touchMoveOffset <= -EXPAND_OFFSET && scrollY === 0) {
      isExpand = false
      sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
    }
  }

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
      class={twMerge('flex-1 flex flex-col bg-white', isTransition && 'fixed w-full z-30 bottom-0')}
      style:min-height={isWindow && !isTransition ? 'auto' : boxContainerHeight}
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
    </div>
  {/if}
</div>
