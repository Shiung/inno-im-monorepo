<script lang="ts">
  import { im } from 'protobuf'
  import { fetchAvatar, fetchVip } from '$src/utils/images'

  import BetOrder from './BetOrder/index.svelte'

  import type { IChatMessage } from 'api/im/types'

  export let message: IChatMessage
  export let thisEl: HTMLDivElement

  let avatarImg, vipImg

  const fetchAvatarImg = async () => {
    if (
      message.contentType === im.enum.contentType.ANCHOR_HOST ||
      message.contentType === im.enum.contentType.ANCHOR_MEMBER
    ) {
      avatarImg = message.avatar
      return
    }

    const imgPath = await fetchAvatar(message.avatar)
    avatarImg = imgPath
  }

  const fetchVipImg = async () => {
    const imgPath = await fetchVip(message.vip)
    vipImg = imgPath
  }

  $: typeof message.avatar === 'string' && fetchAvatarImg()
  $: typeof message.vip === 'number' && fetchVipImg()
</script>

<div data-id={message.msgId} class="rounded-[10px]" bind:this={thisEl}>
  <div class="flex justify-end">

    <div class="flex">
      <div class='inline-block mr-2'>
        {#if message.contentType === im.enum.contentType.CHAT}
          <div class="rounded-[10px] p-[8px] bg-imprimary relative
            after:content-[''] after:absolute after:right-0 after:top-[12px] after:translate-x-full
            after:border-transparent after:border-[5px] after:border-l-[rgb(var(--im-monorepo-primary))]">
            <div class="text-[14px] text-white break-all">{message.content}</div>
          </div>
        {:else if message.contentType === im.enum.contentType.ORDER}
          <BetOrder message={JSON.parse(message.content)} self />
        {/if}
      </div>

      <div class="min-w-[30px] h-[30px] rounded-full bg-[#999999] flex items-center justify-center">
        {#if avatarImg}<img src={avatarImg} class="block w-[30px] h-[30px]" alt="avatar" />{/if}
      </div>
    </div>
  </div>
</div>
