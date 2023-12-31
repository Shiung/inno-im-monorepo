<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { tweened } from 'svelte/motion'
  import { fly } from 'svelte/transition'
  import { expoOut } from 'svelte/easing'
  import { afterUpdate, createEventDispatcher, tick } from 'svelte'
  import { im as impb } from 'protobuf'
  import { Ripple } from 'ui'
  
  import { t } from '$stores'
  import { im as imWs } from 'api/wsMaster'

  import { messageBoxRect } from '../store'
  import Message from './Message'
  import Arrow from '../images/arrow_down_small.svg'

  import { getInfo } from '../context'
  import { filterDuplicatesByMsgId, getLatestVisibleMsg, getOldestMsg, sortMsgsByMsgIdAsc } from '../utils'
  import { headerRect, /* inputRect, */ loadMoreRect, inputAreaOffset } from '../store'

  import type { Writable } from 'svelte/store'
  import type { IChatMessage } from 'api/im/types'

  const { chatId, iid, displayType, height } = getInfo()

  $: isWindow = $displayType === 'window'

  export let chatMessages: Writable<IChatMessage[]>
  export let lastReadId: number

  let dom: HTMLDivElement
  let scrollToNewest: boolean = false
  let allWatched: boolean = true

  const dispatch = createEventDispatcher()

  const onScroll = (scrollTop: number, clientHeight: number, scrollHeight: number) => {
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      scrollToNewest = true
      lastReadId = getLatestVisibleMsg($chatMessages).msgId
    } else scrollToNewest = false

    if (scrollTop < 700 && !fetchMoreLoading) fetchMore()
  }

  const onDomScroll = (e: UIEvent) => {
    const target = e.target as HTMLDivElement
    onScroll(target.scrollTop, target.clientHeight, target.scrollHeight)
  }

  const onWindowScroll = () => {
    onScroll(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)
  }

  const rmvPrevMsgsWhenOverLimit = () => {
    const MAX_MESSAGES_LIMIT = 100
    const SLICE_SIZE = 60

    if ($chatMessages.length > MAX_MESSAGES_LIMIT) chatMessages.update((e) => e.slice(-SLICE_SIZE))
  }

  const observer = new MutationObserver((mutations) => {
    const mutation = mutations[0]
    if (!mutation) return

    const target = isWindow ? window : (mutation.target as HTMLDivElement)
    const _scrollH = isWindow ? document.documentElement.scrollHeight : (mutation.target as HTMLDivElement).scrollHeight

    const { msgId } = getLatestVisibleMsg($chatMessages)
    if (scrollToNewest) {
      rmvPrevMsgsWhenOverLimit()
      lastReadId = msgId
      target.scrollTo({ top: _scrollH })
    }
    checkWatched()
  })

  // const scrollToUnread = () => {
  //   const unreadDom = document.querySelector(`div[data-id='${lastReadId}']`) as HTMLElement
  //   if (unreadDom) {
  //     // workaround 1
  //     // need to consider browser collapse height (window.outerHeight - window.innerHeight)
  //     // unreadDom.scrollIntoView({ block: 'end' })
  //     // if (isWindow) window.scrollTo({ top: window.scrollY + (window.outerHeight - window.innerHeight) + 83 })

  //     // workaround 2 - better
  //     if (isWindow) {
  //       const { offsetTop, offsetHeight } = unreadDom
  //       window.scrollTo(
  //         0,
  //         offsetTop - (window.innerHeight - ($height || 0) - ($headerRect?.height || 0) - ($inputRect?.height || 0)) + offsetHeight
  //       )
  //     } else {
  //       if (dom.clientHeight < dom.scrollHeight) {
  //         unreadDom.scrollIntoView({ block: 'end' })
  //       }
  //     }

  //     // flash(unreadDom)
  //   }
  // }

  // $: if (dom) scrollToUnread()

  let isInitScroll: boolean = true

  const scrollToLatest = (msgs: any[]) => {
    if (!isInitScroll) return

    const target = isWindow ? window : dom
    const targetScrollH = isWindow ? document.documentElement.scrollHeight : dom.scrollHeight

    if (msgs.length) {
      target.scrollTo({ top: targetScrollH })
      isInitScroll = false
    }
  }

  $: if (dom) {
    observer.observe(dom, { childList: true })
    dispatch('domBound', dom)
    messageBoxRect.set(dom?.getBoundingClientRect())
  }

  afterUpdate(() => {
    if (dom) scrollToLatest($chatMessages)
  })

  const checkWatched = () => {
    if (lastReadId === getLatestVisibleMsg($chatMessages).msgId) allWatched = true
    else allWatched = false
  }

  const gotoNewest = () => {
    const target = isWindow ? window : dom
    const _scrollY = isWindow ? window.scrollY : dom.scrollTop
    const _scrollH = isWindow ? document.documentElement.scrollHeight : dom.scrollHeight
    const top = tweened(_scrollY, { easing: expoOut })
    top.subscribe((top) => {
      target.scrollTo({ top })
    })
    top.set(_scrollH)
  }

  let fetchMoreLoading: boolean = false
  let isFetched: boolean = false
  let tempChatMessages: IChatMessage[]

  const fetchMore = async () => {
    if (isFetched && tempChatMessages.length === 0) return

    const oldest = getOldestMsg($chatMessages)
    const targetDom = document.querySelector(`div[data-id='${oldest?.msgId}']`)

    fetchMoreLoading = true
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: oldest?.msgId || 0, chatId: $chatId || String($iid) }
    })
    tempChatMessages = res.data.pushMessageEntity
    chatMessages.update((messages) => filterDuplicatesByMsgId(messages, sortMsgsByMsgIdAsc(res.data.pushMessageEntity)))
    fetchMoreLoading = false
    isFetched = true

    await tick()
    targetDom?.scrollIntoView()

    const offset = 10
    if (isWindow) {
      window.scrollTo({ top: window.scrollY - ($headerRect?.height || 0) - ($loadMoreRect?.height || 0) - offset - ($height || 0) })
    }
  }
</script>

<svelte:window on:scroll={isWindow && onWindowScroll} />

<div
  class="relative flex-1 ">
  <div
    class={twMerge(
      "space-y-[12px] overflow-y-scroll pb-[10px] px-[15px] bg-white",
      !isWindow ? 'absolute top-0 bottom-0 left-0 right-0' : ''
    )}
    on:scroll={!isWindow && onDomScroll}
    style:overscroll-behavior={isWindow ? 'auto' : 'none'}
    bind:this={dom}
  >
    {#each $chatMessages as message (message.msgId)}
      <Message {message} bind:lastReadId self={message.isSelf} />
    {/each}

    {#if !scrollToNewest && !allWatched}
      <div
        in:fly={{ y: 50, duration: 300 }}
        class={twMerge('flex justify-center mx-auto !mt-0 z-10', isWindow ? 'fixed left-1/2 -translate-x-1/2' : 'sticky')}
        style:bottom={`${$inputAreaOffset}px`}
      >
        <Ripple
          class="flex items-center rounded-full bg-imprimary text-[12px] text-white px-[8px] py-[3px]"
          ripple="white"
          on:click={gotoNewest}
        >
          <div>{$t('chat.moreMessage')}</div>
          <Arrow width={20} height={20} fill="white" />
        </Ripple>
      </div>
    {/if}
  </div>
</div>
