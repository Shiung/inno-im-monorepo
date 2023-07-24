<script lang='ts'>
import type { IWebAnchor } from 'api/im/types'
import { Ripple, Badget } from 'ui'
import { t, locale } from '$stores'
import { im } from 'api'
import type { ILanguages } from 'env-config'

import AnchorDetailSheet from '$containers/AnchorDetailSheet'
import AnchorImage from '$src/components/AnchorImage'
import AnchorUserImage from '$components/AnchorUserImage/index.svelte'
import Loading from './Loading.svelte'
import { SIDi18nKey } from '$src/constant'
import type { IWebAnchorMatch } from 'api/im/types'

export let anchor: IWebAnchor

let openDetailSheet: boolean = false
let match: IWebAnchorMatch = null
let loading: boolean = true

const fetchAnchorMatches = async (houseId: string, lang: ILanguages) => {
  loading = true
  const matchesPromise = await im.webAnchorMatchList({ query: { houseId }, headers: { 'Accept-Language': lang }})
  loading = false
  if(matchesPromise?.data?.matchList?.length > 0) {
    match = matchesPromise?.data?.matchList[0]
    return
  }

  match = null
}

$: isMatchType = anchor.sid !== 100

$: if(isMatchType) {
  fetchAnchorMatches(anchor.houseId, $locale)
} else {
  loading = false
}

$: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.deposit`
</script>

<div>
  <Ripple class='w-full flex flex-col h-[139px] im-shadow rounded-[10px] p-2 space-y-1' on:click>
    <div class='flex w-full justify-center'>
      <AnchorUserImage
        isLive={anchor.liveStatus === 2}
        user={anchor.userImage}
        type={isMatchType ? 'match' : 'deposit'}
      />
    </div>

    <div class='flex w-full items-center justify-between'>
      <div class='flex items-center space-x-1'>
        <AnchorImage src={anchor.userImage} class='w-[19px] h-[19px] border border-imprimary rounded-full p-[1px]' />
        <span class='text-imprimary leading-[18px] text-[18px]'> {anchor.houseName} </span>
      </div>

      <Badget
        class='rounded-[6px] leading-3 h-3 text-[9px]'
        background={isMatchType ? `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)` : `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`}
      >
        {$t(badgeStr)}
      </Badget>
    </div>

    <div class='w-full text-left leading-[15px] text-[10px] text-[#999] whitespace-nowrap text-ellipsis overflow-hidden'>
      {#if loading}
        <div class='bg-[#eee] animate-pulse h-[17px] rounded-md'></div>
      {:else if !isMatchType}
        {anchor.houseIntroduction}
      {:else if match}
        {match.homeName} VS {match.awayName}
      {/if}
    </div>

  </Ripple>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
