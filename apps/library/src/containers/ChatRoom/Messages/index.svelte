<script lang="ts">
import { twMerge } from 'tailwind-merge'
import { tweened } from 'svelte/motion'
import { fly } from 'svelte/transition'
import { expoOut } from 'svelte/easing'
import { Ripple } from 'ui'
import { im } from 'api'
import { t } from '$stores'

import flash from './flash'
import Message from './Message'
import DropdownLoader from './DropdownLoader.svelte'
import Arrow from '../images/arrow_down_small.svg'

import type { Writable } from 'svelte/store'
import type { IChatMessage } from 'api/im/types'

export let fixed: boolean
export let userId: string
export let roomId: number
export let height: number
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

  const target = mutation.target as HTMLDivElement

  if (scrollToNewest) {
    lastReadId = getNewestMessage().id
    target.scrollTo({top: target.scrollHeight})
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
    if (fixed) window.scrollTo({ top: window.scrollY - offset - height })
    else dom.scrollTo({ top: dom.scrollTop - offset })
  }
}

$: if (dom) scrollToUnread()

const checkWatched = () => {
  if (lastReadId === getNewestMessage().id) allWatched = true
  else allWatched = false
}

const gotoNewest = () => {
  const target = fixed ? window : dom
  const _scrollY = fixed ? window.scrollY : dom.scrollTop
  const _scrollH = fixed ? document.documentElement.scrollHeight : dom.scrollHeight
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
  const res = await im.chatroomPastMessage({ query: { roomId, quantity: pastQuantity }})
  chatMessages.update(messages => [...res.data.list, ...messages])
  fetchMoreLoading = false

  targetDom.scrollIntoView()

  const headerHeight = 44
  const loadmoreHeight = 34
  const offset = 10
  if (fixed) window.scrollTo({ top: window.scrollY - headerHeight - loadmoreHeight - offset - height })
  else dom.scrollTo({ top: dom.scrollTop - headerHeight - offset })
}

</script>

<svelte:window on:scroll={fixed && onWindowScroll} />

<div class='relative flex-1 space-y-[12px] overflow-y-scroll pb-[10px] px-[15px]' 
  on:scroll={!fixed && onDomScroll} bind:this={dom}
>
  <DropdownLoader quantity={pastQuantity} loading={fetchMoreLoading} root={dom} on:fetchMore={fetchMore} />

  {#each $chatMessages as message}
    <Message {message} bind:lastReadId={lastReadId} self={userId === message.source} />
  {/each}

  {#if !scrollToNewest && !allWatched}
    <div in:fly={{y: 50, duration: 300}} 
      class={twMerge('flex justify-center mx-auto !mt-0 z-10',
        fixed ? 'fixed bottom-[90px] translate-x-[-50%]' : ' bottom-[10px] sticky'
      )}
      style:left={fixed && 'calc(50% - 16px)'}
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
