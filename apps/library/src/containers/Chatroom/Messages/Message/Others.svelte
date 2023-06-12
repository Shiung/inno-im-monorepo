<script lang="ts">
  import type { IChatMessage } from 'api/im/types'
  import { fetchAvatar, fetchVip } from '$src/utils/images'

  export let message: IChatMessage
  
  let avatarImg, vipImg

  const fetchAvatarImg = async () => {
    const imgPath = await fetchAvatar(message.avatar)
    avatarImg = imgPath
  }

  const fetchVipImg = async () => {
    const imgPath = await fetchVip(message.vip)
    vipImg = imgPath
  }

  $: typeof message.avatar === 'number' && fetchAvatarImg()
  $: typeof message.vip === 'number' && fetchVipImg()
</script>

<div class="flex">
  <div class="min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center">
    {#if avatarImg}<img src={avatarImg} class='block w-[30px] h-[30px]' alt='avatar' />{/if}
  </div>

  <div class="ml-[4px]">
    <div class="flex items-center">
      {#if vipImg}<img src={vipImg} class='block w-auto h-[14px] mr-2' alt='vip' />{/if}
      <div class="text-imprimary text-[12px]">{message.senderName}:</div>
    </div>

    <div class="bg-[#f5f5f5] rounded-[10px] p-[8px]">
      <div class="text-[14px]">{message.content}</div>
    </div>
  </div>
</div>
