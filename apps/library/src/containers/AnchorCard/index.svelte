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

  export let anchor: IWebAnchor
  export let match: IWebAnchorMatch

  let openDetailSheet: boolean = false

  $: isLive = anchor?.liveStatus === StreamLiveStatus.LIVE

  $: isMatchType = anchor.sid !== SID.deposit

  $: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.depositWithdraw`

  $: borderStyle = isLive ? 'border-imprimary' : 'border-transparent'
</script>

<div>
  <Ripple class="w-full flex flex-col items-center im-shadow rounded-[10px] p-2 space-y-1" on:click>
    <div class="relative w-full">
      {#if isLive}
        <div class="absolute top-0 left-0 z-[1]">
          <AnchorLiveBadge />
        </div>
      {/if}

      <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} />
    </div>

    <p class="w-full text-left text-[14px] truncate">
      {#if match}
        {match.homeName} VS {match.awayName}
      {:else if anchor.houseName}
        {anchor.houseName}
      {:else}
        <span class="opacity-0">.</span>
      {/if}
    </p>

    <div class="flex w-full items-center justify-between">
      <div class="flex-1 flex items-center space-x-1 overflow-hidden">
        <Ripple on:click={() => (openDetailSheet = true)} class="w-[20%] rounded-full p-[1px] flex-none">
          <AnchorImage 
          src={anchor.userImage} class={twMerge('block w-full h-auto', borderStyle)} borderWidth={1} />
        </Ripple>
        <span class="text-[#666] text-[12px] truncate"> {anchor.nickName}</span>
      </div>

      <Badget
        class="rounded-[6px] leading-3 h-3 text-[9px]"
        background={isMatchType
          ? `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`
          : `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)`}
      >
        {$t(badgeStr)}
      </Badget>
    </div>
  </Ripple>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
