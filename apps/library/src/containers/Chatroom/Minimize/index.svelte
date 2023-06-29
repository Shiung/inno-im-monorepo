<script lang="ts">
  import { Ripple } from 'ui'
  import type { Writable } from 'svelte/store'
  import type { IChatMessage } from 'api/im/types'
  import { im as impb } from 'protobuf'

  import { getEnv } from '../context'
  import Chat from '../images/chat.svg'
  import { twMerge } from 'tailwind-merge'

  const { useScrollCollapse }  = getEnv()

  export let chatMessages: Writable<IChatMessage[]>
  export let lastReadId: number
  
  const TRIGGER_OFFSET = 10
  let prevScrollY: number = 0
  let dom: HTMLDivElement
  let collapseStyles = { transform: '' }
  let isFold = false

  const getVisibleMsgs = (msgs: IChatMessage[], idx?: number) => msgs.slice(idx).filter(msg => msg.visible === impb.enum.visible.ALL)

  const calculateUnread = (msgs: IChatMessage[], _lastReadId: number) => {
    const lastIdx = msgs.findIndex((msg) => msg.msgId === _lastReadId)

    const unreadLength = getVisibleMsgs(msgs, lastIdx + 1).length

    if(unreadLength > 99) return '99+'

    return `${unreadLength}`
  }

  const getLatestMsgContent = (msgs: IChatMessage[]) => {
    const visibleMsgs = getVisibleMsgs(msgs)
    return visibleMsgs[visibleMsgs.length - 1]?.content || ''
  }

  const onWindowScroll = () => {
    const scrollTop = window.scrollY
    if (scrollTop > prevScrollY && isFold) return (prevScrollY = scrollTop)
    if (scrollTop <= prevScrollY && !isFold) return (prevScrollY = scrollTop)

    if (Math.abs(scrollTop - prevScrollY) < TRIGGER_OFFSET) return (prevScrollY = scrollTop)
    
    if (scrollTop > prevScrollY) {
      const domHeight = dom?.getBoundingClientRect()?.height
      const bottomOffset = Number(window.getComputedStyle(dom)?.bottom.replace(/px/, ''))
      collapseStyles = { transform: `translateY(${domHeight + bottomOffset}px)` }
      isFold = true
    } else {
      collapseStyles = { transform: 'translateY(0)' }
      isFold = false
    }

    prevScrollY = scrollTop
  }

  $: unread = calculateUnread($chatMessages, lastReadId)

  $: content = getLatestMsgContent($chatMessages)

</script>

<svelte:window on:scroll={$useScrollCollapse && onWindowScroll} />

<div
  bind:this={dom}
  class={twMerge(
    "fixed left-0 bottom-[18px] w-[100vw] px-[20px]",
    $useScrollCollapse && 'transition-transform'
  )}
  style:transform={collapseStyles.transform}
>
  <Ripple
    class="flex items-center w-full im-shadow rounded-[20px] h-[48px] px-[20px] bg-white"
    on:click
  >
    <div class="relative">
      <Chat class="min-w-[20px]" width={20} height={20} fill="#666666" />

      {#if unread && unread !== '0'}
        <div
          class="absolute bg-imprimary rounded-full top-[-30%] left-[50%] px-[2px] text-[10px] text-white font-semibold min-w-[15px]"
        >
          {unread}
        </div>
      {/if}
    </div>

    <div class="text-[14px] text-[#bbbbbb] truncate text-start ml-[12px]">
      {content}
    </div>
  </Ripple>
</div>
