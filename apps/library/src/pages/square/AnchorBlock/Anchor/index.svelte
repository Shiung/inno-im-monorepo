<script lang="ts">
  import type { IWebAnchor } from 'api/im/types'
  import { Ripple, Badget } from 'ui'

  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorUserImage from '$containers/AnchorUserImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'

  import { SIDi18nKey, SID, StreamLiveStatus } from '$src/constant'
  import { t } from '$stores'

  import { getSquareStore } from '../../store'

  export let anchor: IWebAnchor

  let openDetailSheet: boolean = false

  const { anchorMatches, anchorMatchLoadings } = getSquareStore()

  $: isLive = anchor?.liveStatus === StreamLiveStatus.LIVE

  $: isMatchType = anchor.sid !== SID.deposit

  $: loading = $anchorMatchLoadings[anchor.houseId]

  $: match = $anchorMatches[anchor.houseId]

  $: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.depositWithdraw`
</script>

<div>
  <Ripple class="w-full flex flex-col items-center h-[139px] im-shadow rounded-[10px] p-2 space-y-1" on:click>
    <div class="relative">
      {#if isLive}
        <div class="absolute top-0 left-0 z-[1]">
          <AnchorLiveBadge />
        </div>
      {/if}

      <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} class='w-[144px]' />
    </div>

    <div class="flex w-full items-center justify-between">
      <div class="flex-1 flex items-center space-x-1 overflow-hidden">
        <Ripple on:click={() => openDetailSheet = true} class="w-[19px] h-[19px] border border-imprimary rounded-full p-[1px] flex-none">
          <AnchorImage src={anchor.userImage} class="block w-full h-auto" />
        </Ripple>
        <span class="text-imprimary leading-[18px] text-[18px] truncate"> {anchor.houseName} </span>
      </div>

      <Badget
        class="rounded-[6px] leading-3 h-3 text-[9px]"
        background={isMatchType
          ? `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)`
          : `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`}
      >
        {$t(badgeStr)}
      </Badget>
    </div>

    <div class="w-full text-left leading-[15px] text-[10px] text-[#999] truncate">
      {#if loading}
        <div class="bg-[#eee] animate-pulse h-[17px] rounded-md" />
      {:else if match}
        {match.homeName} VS {match.awayName}
      {:else}
        {anchor.nickName}
      {/if}
    </div>
  </Ripple>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
