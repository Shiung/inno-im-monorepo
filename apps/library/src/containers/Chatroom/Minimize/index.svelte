<script lang="ts">
  import { Ripple } from 'ui'
  import { createEventDispatcher } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { IChatMessage } from 'api/im/types'

  import Chat from '../images/chat.svg'

  const dispatch = createEventDispatcher()

  export let chatMessages: Writable<IChatMessage[]>
  export let lastReadId: number

  const calculateUnread = (msgs: IChatMessage[], _lastReadId: number) => {
    if (!_lastReadId) return msgs.length

    const lastIdx = msgs.findIndex((msg) => msg.msgId === _lastReadId)
    return msgs.length - lastIdx - 1
  }

  $: unread = calculateUnread($chatMessages, lastReadId)
</script>

<div class="fixed bottom-[31px] w-[100vw] px-[20px]">
  <Ripple
    class="flex items-center w-full im-shadow rounded-[20px] h-[48px] px-[20px]"
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
      {$chatMessages[$chatMessages.length - 1]?.content || ''}
    </div>
  </Ripple>
</div>
