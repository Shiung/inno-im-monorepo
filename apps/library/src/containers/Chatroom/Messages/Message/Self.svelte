<script lang="ts">
  import { im } from 'protobuf'
  import BetOrder from './BetOrder/index.svelte'

  import type { IChatMessage } from 'api/im/types'

  export let message: IChatMessage
  export let thisEl: HTMLDivElement
</script>

<div data-id={message.msgId} class="rounded-[10px]" bind:this={thisEl}>
  <div class="flex justify-between">
    <div />

    <div class="flex">
      {#if message.contentType === im.enum.contentType.CHAT}
        <div class="ml-[4px] bg-[#f5f5f5] rounded-[10px] p-[8px] bg-imprimary">
          <div class="text-[14px] text-white">{message.content}</div>
        </div>
      {:else if message.contentType === im.enum.contentType.ORDER}
        <BetOrder message={JSON.parse(message.content)} self />
      {/if}

      <!-- <div
        class="min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center ml-[4px]"
      >
        {message.avatar}
      </div> -->
    </div>
  </div>
</div>
