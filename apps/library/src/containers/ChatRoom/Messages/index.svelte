<script lang="ts">
import { fly } from 'svelte/transition'
import { Ripple } from 'ui'
import { im } from 'api'
import Circle from 'ui/core/button/loading.svelte'
import { t } from '$stores'

import Message from './Message'
import Arrow from '../images/arrow_down_small.svg'

import type { Writable } from 'svelte/store'
import type { IChatMessage } from 'api/im/types'

export let userId: string
export let roomId: number
export let chatMessages: Writable<IChatMessage[]>

let dom: HTMLDivElement
let scrollToNewest: boolean = true
let newestId: string

const getNewestMessage = () => $chatMessages[$chatMessages.length - 1]

const onDomScroll = (e: UIEvent) => {
  const target = e.target as HTMLDivElement
  if (target.scrollTop + target.clientHeight === target.scrollHeight) {
    scrollToNewest = true 
    newestId = getNewestMessage().id
  } else scrollToNewest = false
}

const observer = new MutationObserver(mutations => {
  const mutation = mutations[0]
  if (!mutation) return

  const target = mutation.target as HTMLDivElement

  if (scrollToNewest) {
    newestId = getNewestMessage().id
    target.scrollTo({top: target.scrollHeight})
  } 
  checkWatched()
})

$: if (dom) observer.observe(dom, { childList: true })
$: if (dom) dom.scrollTo({ top: dom.scrollHeight })

let allWatched: boolean = true

const checkWatched = () => {
  if (newestId === getNewestMessage().id) allWatched = true
  else allWatched = false
}

const gotoNewest = () => {
  dom.scrollTo({ top: dom.scrollHeight })
}

let pastQuantity = 30
let loadDom: HTMLDivElement
const intersectionObserver = new IntersectionObserver(async entries => {
  for (const entry of entries) {
    if (entry.intersectionRatio <= 0) return

    const targetId = $chatMessages[pastQuantity].id
    const targetDom = document.querySelector(`div[data-id='${targetId}']`)

    const res = await im.chatroomPastMessage({ query: { roomId, quantity: pastQuantity }})
    chatMessages.update(messages => [...res.data.list, ...messages])

    targetDom.scrollIntoView()
    dom.scrollTo({ top: dom.scrollTop - loadDom.clientHeight - 10 })
  }
})

$: if (dom && loadDom) intersectionObserver.observe(loadDom)

</script>

<div class='relative flex-1 space-y-[12px] overflow-y-scroll pb-[10px] px-[15px]' on:scroll={onDomScroll} bind:this={dom}>

  <div class='relative h-[30px] overflow-hidden' bind:this={loadDom}>
    <Circle stroke='rgb(var(--im-monorepo-primary))' />
  </div>

  {#each $chatMessages as message}
    <Message message={message} self={userId === message.source} />
  {/each}

  {#if !scrollToNewest && !allWatched}
    <div in:fly={{y: 50, duration: 300}} class='flex justify-center sticky bottom-0 w-full !mt-0'> 
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
