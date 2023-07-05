<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { tweened } from 'svelte/motion'
  import { fly } from 'svelte/transition'
  import { expoOut } from 'svelte/easing'
  import { createEventDispatcher, tick } from 'svelte'
  import { im as impb } from 'protobuf'
  import { Ripple } from 'ui'

  import { t } from '$stores'
  import { im as imWs } from 'api/wsMaster'
  import type { IPushMessageEntity } from 'protobuf/im/types'

  import flash from './flash'
  import Message from './Message'
  import DropdownLoader from './Loader/DropdownLoader.svelte'
  import ButtonLoader from './Loader/ButtonLoader.svelte'
  import Arrow from '../images/arrow_down_small.svg'

  import { getInfo } from '../context'
  import { chatEnv, rmvPrevMsgsWhenOverLimit } from '../controller'
  import { inputAreaOffset } from '../InputArea/store'

  import type { Writable } from 'svelte/store'
  import type { IChatMessage } from 'api/im/types'

  const { chatId, iid, displayType, height } = getInfo()

  $: isWindow = $displayType === 'window'

  export let chatMessages: Writable<IChatMessage[]>
  export let lastReadId: number

  let dom: HTMLDivElement
  let scrollToNewest: boolean = false

  const getOldestMessage = () => ($chatMessages.find((msg) => msg.visible === impb.enum.visible.ALL) || {}) as IPushMessageEntity
  const getNewestMessage = () => ($chatMessages.findLast((msg) => msg.visible === impb.enum.visible.ALL) || {}) as IPushMessageEntity

  const dispatch = createEventDispatcher()

  const onScroll = (scrollTop: number, clientHeight: number, scrollHeight: number) => {
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      scrollToNewest = true
      lastReadId = getNewestMessage().msgId
    } else scrollToNewest = false
  }

  const onDomScroll = (e: UIEvent) => {
    const target = e.target as HTMLDivElement
    onScroll(target.scrollTop, target.clientHeight, target.scrollHeight)
  }

  const onWindowScroll = () => {
    onScroll(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)
  }

  const observer = new MutationObserver((mutations) => {
    const mutation = mutations[0]
    if (!mutation) return

    const target = isWindow ? window : (mutation.target as HTMLDivElement)
    const _scrollH = isWindow ? document.documentElement.scrollHeight : (mutation.target as HTMLDivElement).scrollHeight

    const { msgId } = getNewestMessage()
    if (scrollToNewest) {
      rmvPrevMsgsWhenOverLimit({ chatId: $chatId, iid: $iid })
      lastReadId = msgId
      target.scrollTo({ top: _scrollH })
    }
    checkWatched()
  })

  $: if (dom) observer.observe(dom, { childList: true })

  let allWatched: boolean = true
  const scrollToUnread = () => {
    const unreadDom = document.querySelector(`div[data-id='${lastReadId}']`) as HTMLElement
    if (unreadDom) {
      unreadDom.scrollIntoView({ block: 'end' })
      flash(unreadDom)

      const offset = 83
      if (isWindow) window.scrollTo({ top: window.scrollY + offset })
    }
  }

  $: if (dom) scrollToUnread()

  $: if (dom) dispatch('domBound', dom)

  $: isPC = $chatEnv.device === 'pc'

  const checkWatched = () => {
    if (lastReadId === getNewestMessage().msgId) allWatched = true
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
  const fetchMore = async () => {
    const targetId = getOldestMessage().msgId
    const targetDom = document.querySelector(`div[data-id='${targetId}']`)

    fetchMoreLoading = true
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: $chatMessages?.[0]?.msgId || 0, chatId: $chatId || String($iid) }
    })
    chatMessages.update((messages) => [...res.data.pushMessageEntity, ...messages])
    fetchMoreLoading = false

    await tick()
    targetDom?.scrollIntoView()

    const headerHeight = 44
    const loadmoreHeight = 34
    const offset = 10
    if (isWindow) window.scrollTo({ top: window.scrollY - headerHeight - loadmoreHeight - offset - $height })
    else dom.scrollTo({ top: dom.scrollTop - headerHeight - offset })
  }
</script>

<svelte:window on:scroll={isWindow && onWindowScroll} />

<div
  class="relative flex-1 space-y-[12px] overflow-y-scroll pb-[10px] px-[15px] bg-white"
  on:scroll={!isWindow && onDomScroll}
  style:overscroll-behavior={isWindow ? 'auto' : 'none'}
  bind:this={dom}
>
  {#if isPC}
    <ButtonLoader loading={fetchMoreLoading} on:fetchMore={fetchMore} />
  {:else}
    <DropdownLoader loading={fetchMoreLoading} root={dom} on:fetchMore={fetchMore} />
  {/if}

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
