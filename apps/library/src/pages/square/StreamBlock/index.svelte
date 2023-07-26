<script lang="ts">
  import { Badget } from 'ui'
  import type { IWebAnchor } from 'api/im/types'
  import Circle from 'ui/core/button/loading.svelte'

  import StreamingPlayer, { onError, onLostData, onReady, isFlvUse } from '$containers/StreamingPlayer'
  import AnchorImage from '$containers/AnchorImage'
  import { t } from '$stores'
  import { SIDi18nKey, SID } from '$src/constant'
  
  import Loading from './Loading.svelte'
  import { getSquareStore } from '../store'

  const { anchorMatches, anchorMatchLoadings } = getSquareStore()

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

  $: match = $anchorMatches[streaming?.houseId]

  $: matchLoading = $anchorMatchLoadings[streaming?.houseId]

  $: isMatchType = streaming?.sid !== SID.deposit

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

    <div class='bg-white px-3 py-2 space-y-2 rounded-b-[20px] min-h-[35px]'>
      {#if streaming}
        <div class='flex items-center justify-between space-x-1'>
          <div class='flex-1 flex items-center space-x-1 overflow-hidden'>
            <AnchorImage src={streaming?.userImage} class='w-[19px] h-[19px] border border-imprimary rounded-full p-[1px] ml-2' />
            <span class='flex-initial max-w-[50%] text-imprimary leading-[18px] text-[18px] truncate'> {streaming?.houseName} </span>

            <div class='flex-1 leading-[15px] text-[10px] text-[#999] truncate'>
              {#if matchLoading}
                <div class='bg-[#eee] animate-pulse h-[15px] rounded-md'></div>
              {:else if !isMatchType}
                {streaming?.houseIntroduction}
              {:else if match}
                {match.homeName} VS {match.awayName}
              {/if}
            </div>
          </div>

          <Badget
            class='rounded-[6px] leading-3 h-3 text-[9px]'
            background={isMatchType ? `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)` : `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`}
          >
            {$t(badgeStr)}
          </Badget>
        </div>
      {/if}
    </div>
  </div>
  <!-- {/if} -->
{/if}
