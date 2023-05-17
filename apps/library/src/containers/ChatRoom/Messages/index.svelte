<script lang="ts">
import { Ripple } from 'ui'
import type { IChatMessage } from 'api/im/types'
import { t } from '$stores'

import Message from './Message'
import Arrow from '../images/arrow_down_small.svg'

export let userId: string
export let messages: IChatMessage[]

let dom: HTMLDivElement
let scrollToNewest: boolean = true
let newestId: string

const getNewestMessage = () => messages[messages.length - 1]

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


let allWatched: boolean = true

const checkWatched = () => {
  if (newestId === getNewestMessage().id) allWatched = true
  else allWatched = false
}

const gotoNewest = () => {
  dom.scrollTo({ top: dom.scrollHeight })
}

</script>

<div class='relative flex-1 space-y-[12px] overflow-y-scroll pb-[10px] px-[15px]' on:scroll={onDomScroll} bind:this={dom}>
  {#each messages as message}
    <Message message={message} self={userId === message.source} />
  {/each}

  {#if !scrollToNewest && !allWatched}
    <div class='flex justify-center sticky bottom-0 w-full !mt-0'> 
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
