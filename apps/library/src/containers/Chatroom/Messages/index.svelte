<script lang="ts">
import { twMerge } from 'tailwind-merge'
import { tweened } from 'svelte/motion'
import { fly } from 'svelte/transition'
import { expoOut } from 'svelte/easing'
import { Ripple } from 'ui'
import { im } from 'api'
import { t, locale } from '$stores'

import flash from './flash'
import Message from './Message'
import DropdownLoader from './DropdownLoader.svelte'
import Arrow from '../images/arrow_down_small.svg'

import { getInfo, getEnv } from '../context'

import type { Writable } from 'svelte/store'
import type { IChatMessage } from 'api/im/types'

const { userId, roomId } = getInfo()

const { displayType, height } = getEnv()

$: isWindow = $displayType === 'window'

export let chatMessages: Writable<IChatMessage[]>
export let lastReadId: string

let dom: HTMLDivElement
let scrollToNewest: boolean = false

const getNewestMessage = () => $chatMessages[$chatMessages.length - 1]

const onScroll = (scrollTop: number, clientHeight:number, scrollHeight: number) => {

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    scrollToNewest = true 
    lastReadId = getNewestMessage().id
  } else scrollToNewest = false
}

const onDomScroll = (e: UIEvent) => {
  const target = e.target as HTMLDivElement
  onScroll(target.scrollTop, target.clientHeight, target.scrollHeight)
}

const onWindowScroll = () => {
  onScroll(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)
}

const observer = new MutationObserver(mutations => {
  const mutation = mutations[0]
  if (!mutation) return

  const target = isWindow ? window : mutation.target as HTMLDivElement
  const _scrollH = isWindow ? document.documentElement.scrollHeight : (mutation.target as HTMLDivElement).scrollHeight

  if (scrollToNewest) {
    lastReadId = getNewestMessage().id
    target.scrollTo({top: _scrollH})
  } 
  checkWatched()
})

$: if (dom) observer.observe(dom, { childList: true })

let allWatched: boolean = true
const scrollToUnread = () => {
  const unreadDom = document.querySelector(`div[data-id='${lastReadId}']`) as HTMLElement
  if (unreadDom) {
    unreadDom.scrollIntoView()
    flash(unreadDom)

    const offset = 200
    if (isWindow) window.scrollTo({ top: window.scrollY - offset - $height })
    else dom.scrollTo({ top: dom.scrollTop - offset })
  }
}

$: if (dom) scrollToUnread()

const checkWatched = () => {
  if (lastReadId === getNewestMessage().id) allWatched = true
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

let pastQuantity = 10
let fetchMoreLoading: boolean = false
const fetchMore = async () => {
  const targetId = $chatMessages[pastQuantity].id
  const targetDom = document.querySelector(`div[data-id='${targetId}']`)

  fetchMoreLoading = true
  const res = await im.chatroomPastMessage({ query: { roomId: $roomId, quantity: pastQuantity }, headers: { 'Accept-Language': $locale } })
  chatMessages.update(messages => [...res.data.list, ...messages])
  fetchMoreLoading = false

  targetDom.scrollIntoView()

  const headerHeight = 44
  const loadmoreHeight = 34
  const offset = 10
  if (isWindow) window.scrollTo({ top: window.scrollY - headerHeight - loadmoreHeight - offset - $height })
  else dom.scrollTo({ top: dom.scrollTop - headerHeight - offset })
}

</script>

<svelte:window on:scroll={isWindow && onWindowScroll} />

<div class='relative flex-1 space-y-[12px] overflow-y-scroll pb-[10px] px-[15px]' 
  on:scroll={!isWindow && onDomScroll} bind:this={dom}
>
  <DropdownLoader quantity={pastQuantity} loading={fetchMoreLoading} root={dom} on:fetchMore={fetchMore} />

  {#each $chatMessages as message}
    <Message {message} bind:lastReadId={lastReadId} self={$userId === message.source} />
  {/each}

  {#if !scrollToNewest && !allWatched}
    <div in:fly={{y: 50, duration: 300}} 
      class={twMerge('flex justify-center mx-auto !mt-0 z-10',
        isWindow ? 'fixed bottom-[90px] translate-x-[-50%]' : ' bottom-[10px] sticky'
      )}
      style:left={isWindow && 'calc(50% - 16px)'}
    >
      <Ripple
        class='flex items-center rounded-full bg-imprimary text-[12px] text-white px-[8px] py-[3px]'
        ripple='white'
        on:click={gotoNewest}
      >
        <div> {$t('chat.moreMessage')} </div>
        <Arrow width={20} height={20} fill='white'/>
      </Ripple>
    </div>
  {/if}

</div>
