<script lang="ts">
  import type { IChatMessage } from 'api/im/types'
  import { fetchAvatar } from '$src/utils/avatar'

  export let message: IChatMessage
  
  let avatarImg

  const fetchAvatarImg = async () => {
    const imgPath = await fetchAvatar(message.avatar)
    avatarImg = imgPath
  }

  $: typeof message.avatar === 'number' && fetchAvatarImg()
</script>

<div class="flex">
  <div class="min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center">
    {#if avatarImg}<img src={avatarImg} class='block w-[30px] h-[30px]' alt='avatar' />{/if}
  </div>

  <div class="ml-[4px]">
    <div class="flex items-center">
      <div class="text-[12px]">VIP{message.vip}</div>
      <div class="text-imprimary text-[12px] ml-[4px]">{message.senderName}:</div>
    </div>

    <div class="bg-[#f5f5f5] rounded-[10px] p-[8px]">
      <div class="text-[14px]">{message.content}</div>
    </div>
  </div>
</div>
