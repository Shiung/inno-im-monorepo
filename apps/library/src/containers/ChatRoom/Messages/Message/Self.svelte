<script lang="ts">
import type { IChatMessage } from 'api/im/types'

export let message: IChatMessage
</script>

<div class='flex justify-between'>
  <div />

  <div class='flex'>
    <div class='ml-[4px] bg-[#f5f5f5] rounded-[10px] p-[8px] bg-imprimary'>
      <div class='text-[14px] text-white'> {message.data.message} </div>
    </div>

    <div class='min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center ml-[4px]'>
      {message.sourceInfo.avatar}
    </div>
  </div>

</div>