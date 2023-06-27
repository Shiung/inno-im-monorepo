<script lang="ts">
  import { Ripple } from 'ui'
  import { createEventDispatcher } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { IChatMessage } from 'api/im/types'
  import { im as impb } from 'protobuf'

  import Chat from '../images/chat.svg'

  const dispatch = createEventDispatcher()

  export let chatMessages: Writable<IChatMessage[]>
  export let lastReadId: number

  const getVisibleMsgs = (msgs: IChatMessage[], idx?: number) => msgs.slice(idx).filter(msg => msg.visible === impb.enum.visible.ALL)

  const calculateUnread = (msgs: IChatMessage[], _lastReadId: number) => {
    const lastIdx = msgs.findIndex((msg) => msg.msgId === _lastReadId)

    return getVisibleMsgs(msgs, lastIdx + 1).length
  }

  const getLatestMsgContent = (msgs: IChatMessage[]) => {
    const visibleMsgs = getVisibleMsgs(msgs)
    return visibleMsgs[visibleMsgs.length - 1]?.content || ''
  }

  $: unread = calculateUnread($chatMessages, lastReadId)

  $: content = getLatestMsgContent($chatMessages)
</script>

<div class="fixed bottom-[31px] w-[100vw] px-[20px]">
  <Ripple
    class="flex items-center w-full im-shadow rounded-[20px] h-[48px] px-[20px] bg-white"
    on:click={() => dispatch('click')}
  >
    <div class="relative">
      <Chat class="min-w-[20px]" width={20} height={20} fill="#666666" />

      {#if unread !== 0}
        <div
          class="absolute bg-imprimary rounded-full top-[-30%] right-[-40%] px-[2px] text-[10px] text-white font-semibold min-w-[15px]"
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
