<script lang="ts">
  import type { IWebAnchor, IWebAnchorMatch } from 'api/im/types'
  import { Ripple, Badget } from 'ui'
  import { twMerge } from 'tailwind-merge'

  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorUserImage from '$containers/AnchorUserImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'

  import { SIDi18nKey, SID, StreamLiveStatus } from '$src/constant'
  import { t } from '$stores'
  import { navigationAnchor } from '$src/utils/anchor'

  export let anchor: IWebAnchor
  export let match: IWebAnchorMatch

  let openDetailSheet: boolean = false

  $: isLive = anchor?.liveStatus === StreamLiveStatus.LIVE

  $: isMatchType = anchor.sid !== SID.deposit

  $: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.depositWithdraw`

  $: borderStyle = isLive ? 'border-imprimary' : 'border-transparent'
</script>

<div data-cid="AnchorCard" data-houseId={anchor.houseId} data-iid={isMatchType ? match?.iid : ''}>
  <Ripple class="w-full im-shadow rounded-[10px] p-2 space-y-1" on:click={() => navigationAnchor(isMatchType, match, anchor.houseId)}>
    <div class="relative w-full">
      {#if isLive}
        <div class="absolute top-0 left-0 z-[1]">
          <AnchorLiveBadge />
        </div>
      {/if}

      <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} />
    </div>

    <p class="w-full text-left text-[14px] lg:text-[16px] truncate min-h-[20px]">
      {#if match}
        {match.homeName} VS {match.awayName}
      {:else}
        {anchor.houseName}
      {/if}
    </p>

    <div class="flex w-full items-center justify-between">
      <div class="flex-1 flex items-center space-x-1 overflow-hidden">
        <Ripple on:click={() => (openDetailSheet = true)} class="w-[24px] h-[24px] lg:h-[32px] lg:w-[32px] rounded-full p-[1px] flex-none">
          <AnchorImage 
          src={anchor.userImage} class={twMerge('block w-full h-full', borderStyle)} borderWidth={1} />
        </Ripple>
        <span class="text-[#666] text-[12px] lg:text-[14px] truncate"> {anchor.nickName}</span>
      </div>

      <Badget
        class="rounded-[12px] leading-3 text-[11px] lg:text-[14px] lg:h-[20px] lg:px-2 px-[6px]"
        background={isMatchType
          ? 'linear-gradient(270deg, rgb(var(--im-monorepo-primary)) 0%, rgb(var(--im-monorepo-secondary)) 100%)'
          : 'linear-gradient(108deg, #6AA1FF 0%, #FD99E1 100%)'}
      >
        {$t(badgeStr)}
      </Badget>
    </div>
  </Ripple>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
