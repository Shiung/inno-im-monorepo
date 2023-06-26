<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initEnv, initInfo } from './context'
  import type { IChatroomEnv, IChatroomInfo } from './context'
  import type { SizeChangedCallback } from './type'

  let env = writable(initEnv)
  export const setChatEnv = (_env: Partial<IChatroomEnv>) => env.update((e) => ({ ...e, ..._env }))

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) =>
    info.update((e) => ({ ...e, ..._info }))

  let sizeChangedCallback: SizeChangedCallback = () => {}
  export const onSizeChangedCallback = (callback: SizeChangedCallback) => {
    if (typeof callback !== 'function')
      return console.warn('onSizeChangedCallback callback MUST be function')
    sizeChangedCallback = callback
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import { fly } from 'svelte/transition'
  import { twMerge } from 'tailwind-merge'
  import { im } from 'api'
  import { im as impb } from 'protobuf'
  import { im as imWs } from 'api/wsMaster'
  import type { IChatMessage } from 'api/im/types'
  import { t, locale } from '$stores'
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
  const { minimize, displayType, height, size } = setEnv($env)

  $: setChatEnv({
    minimize: $minimize
  })
  
  env.subscribe(e => {
    displayType.set(e.displayType)
    height.set(e.height)
    size.set(e.size)
  })

  $: setInfo($info)

  $: isWindow = $displayType === 'window'

  let lastReadId: number

  // $: destination = `/topic/chat-room/${$roomId}`
  // let subId: string

  let subscription: ReturnType<typeof imWs.subscribe>
  let chatMessages = writable<IChatMessage[]>([])

  const subscribeRoom = (_roomId: number) => {
    subscription = imWs.subscribe(impb.enum.command.PUSH_MESSAGE, ({ data }) => {
      chatMessages.update((messages) => [...messages, data])
    })
  }

  $: if ($roomId) subscribeRoom($roomId)

  let initFetchLoading: boolean = true
  const initFetch = async () => {
    const res = await im.chatroomPastMessage({ query: { roomId: $roomId, quantity: 30 }, headers: { 'Accept-Language': $locale } })
    chatMessages.update((messages) => [...res.data.list, ...messages])
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
    $minimize = false
    sizeChangedCallback && sizeChangedCallback({ size: EChatroomSize.NORMAL, transition: true })
  }

  const foldChatroom = async () => {
    isTransition = true
    await tick() // for chatroom content chang to <Loading>
    $minimize = true
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
    initBodyHeight()
    initFetch()
    imWs.activate()
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
  {#if $minimize}
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
