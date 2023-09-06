<script lang="ts">
  import type { IChatMessage } from 'api/im/types'
  import { fetchAvatar, fetchVip } from '$src/utils/images'
  import { im } from 'protobuf'
  import BetOrder from './BetOrder/index.svelte'
  import { chatT } from '$stores'

  export let message: IChatMessage
  export let thisEl: HTMLDivElement

  let avatarImg, vipImg

  const fetchAvatarImg = async () => {
    if (
      message.contentType === im.enum.contentType.ANCHOR_HOST ||
      message.contentType === im.enum.contentType.ANCHOR_MEMBER
    ) {
      if (!message.avatar) {
        const promise = await import('$src/assets/avatar/defaultAvatar.png')
        avatarImg = promise.default
        return
      }
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

{#if message.visible === im.enum.visible.ALL}
  <div data-id={message.msgId} class="rounded-[10px]" bind:this={thisEl}>
    <div class="flex">
      <div class="min-w-[30px] h-[30px] rounded-full flex items-center justify-center">
        {#if avatarImg}<img src={avatarImg} class="block w-[30px] h-[30px]" alt="avatar" />{/if}
      </div>

      <div class="ml-1">
        <div class="flex items-center">
          {#if vipImg}<img src={vipImg} class="block w-auto h-[14px] mr-2" alt="vip" />{/if}
          <div class="text-imprimary text-[12px]">{message.senderName}:</div>
        </div>

        <div class='inline-block'>
          {#if message.contentType === im.enum.contentType.ORDER}
            <BetOrder message={JSON.parse(message.content)} />
          {:else}
            <div class="bg-[#f5f5f5] rounded-[10px] p-[8px]">
              <div class="text-[14px] break-all">{$chatT(message.content, message.translationList)}</div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{:else}
  <div data-id={message.msgId} data-status='invisible' class='!mt-0'></div>
{/if}
