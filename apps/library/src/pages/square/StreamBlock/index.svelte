<script lang="ts">
  import StreamingPlayer, { onError, onLostData, onReady, isFlvUse } from '$containers/StreamingPlayer'
  import { Badget } from 'ui'
  import Circle from 'ui/core/button/loading.svelte'
  import type { IWebAnchor } from 'api/im/types'
  import { t, locale } from '$stores'
  import AnchorImage from '$containers/AnchorImage'
  import type { IWebAnchorMatch } from 'api/im/types'
  import type { ILanguages } from 'env-config'

  import Loading from './Loading.svelte'
  import { SIDi18nKey, SID } from '$src/constant'
  import { fetchAnchorMatches } from '$src/pages/anchor/AnchorList/utils'

  export let streaming: IWebAnchor
  export let loading: boolean

  let streamLoading = false
  let streamError = false
  let prevStreamUrl: string

  const regStreamingCallbacks = () => {
    const errorCallback = () => {
      streamLoading = false
      streamError = true
    }

    onError(errorCallback)

    onLostData(errorCallback)

    onReady(() => {
      streamLoading = false
    })
  }

  regStreamingCallbacks()

  const resetStatus = (streaming: IWebAnchor) => {
    streamError = false
    streamLoading = false

    if (!streaming || streaming?.liveStatus !== 2) {
      prevStreamUrl = ''
      return
    }

    if (isFlvUse && streaming?.playStreamAddress !== prevStreamUrl) {
      streamLoading = true
    }
    if (!isFlvUse && streaming?.playStreamAddress2 !== prevStreamUrl) {
      streamLoading = true
    }

    prevStreamUrl = isFlvUse ? streaming?.playStreamAddress : streaming?.playStreamAddress2
  }

  $: resetStatus(streaming)

  let match: IWebAnchorMatch = null
  let matchLoading: boolean = false
  const fetchMatchesIfIsMatchType = async (houseId: string, isMatch: boolean, lang: ILanguages) => {
    if(!houseId || !isMatch) return (matchLoading = false)

    matchLoading = true
    const [firstMatch] = await fetchAnchorMatches(houseId, lang)
    matchLoading = false

    match = firstMatch || null
  }

  $: isMatchType = streaming?.sid !== SID.deposit

  $: fetchMatchesIfIsMatchType(streaming?.houseId, isMatchType, $locale)

  $: badgeStr = isMatchType ? SIDi18nKey[streaming?.sid] : `common.depositWithdraw`
</script>

{#if loading}
  <Loading />
{:else}
  <!-- {#if !streamError} -->
  <div class="relative min-h-[200px]">
    {#if streaming?.liveStatus === 2 && streamLoading}
      <div class="absolute z-10 inset-0 bg-white flex items-center justify-center">
        <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden">
          <Circle stroke="rgb(var(--im-monorepo-primary))" />
        </div>
      </div>
    {/if}

    <StreamingPlayer {streaming} useDefControls />

    {#if streaming}
      <div class='bg-white px-2 py-3 space-y-2'>
        <div class='flex items-center justify-between'>
          <div class='flex items-center space-x-1'>
            <AnchorImage src={streaming?.userImage} class='w-[19px] h-[19px] border border-imprimary rounded-full p-[1px]' />
            <span class='text-imprimary leading-[18px] text-[18px]'> {streaming?.houseName} </span>
          </div>

          <Badget
            class='rounded-[6px] leading-5 h-5 text-sm'
            background={isMatchType ? `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)` : `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`}
          >
            {$t(badgeStr)}
          </Badget>
        </div>

        <div class='w-full text-left leading-[15px] text-[10px] text-[#999] whitespace-nowrap text-ellipsis overflow-hidden'>
          {#if matchLoading}
            <div class='bg-[#eee] animate-pulse h-[17px] rounded-md'></div>
          {:else if !isMatchType}
            {streaming?.houseIntroduction}
          {:else if match}
            {match.homeName} VS {match.awayName}
          {/if}
        </div>
      </div>
    {/if}
  </div>
  <!-- {/if} -->
{/if}
