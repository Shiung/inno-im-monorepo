<script lang="ts">
  import type { IChatMessage } from 'api/im/types'

  export let message: IChatMessage
</script>

<div class="flex">
  <div class="min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center">
    {message.avatar}
  </div>

  <div class="ml-[4px]">
    <div class="flex items-center">
      <div class="text-[12px]">VIP{message.vip}</div>
      <div class="text-imprimary text-[12px] ml-[4px]">{message.senderName}:</div>
    </div>

    <div class="bg-[#f5f5f5] rounded-[10px] p-[8px]">
      <div class="text-imprimary text-[12px]">{message.senderName}:</div>
      <div class="text-[14px]">{message.content}</div>
    </div>
  </div>
</div>
