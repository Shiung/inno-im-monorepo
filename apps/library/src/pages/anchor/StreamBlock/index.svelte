<script lang="ts">
  import { Badget } from 'ui'
  import type { IWebAnchor } from 'api/im/types'
  import Circle from 'ui/core/button/loading.svelte'

  import InStreamingPlayer, { isFlvUse } from '$containers/InStreamingPlayer'
  import AnchorImage from '$containers/AnchorImage'
  import { t } from '$stores'
  import { SIDi18nKey, SID, StreamLiveStatus } from '$src/constant'
  import { twMerge } from 'tailwind-merge'

  import Loading from './Loading.svelte'
  import { getSquareStore } from '../store'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'
  import { navigationAnchor } from '$src/utils/anchor'

  const { anchorMatches, anchorMatchLoadings } = getSquareStore()

  export let streaming: IWebAnchor
  export let loading: boolean

  let streamLoading = false
  let streamError = false
  let prevStreamUrl: string
  let streamOnReadyCb
  let streamOnErrorCb
  let streamOnLostDataCb

  const regStreamingCallbacks = () => {
    streamOnReadyCb = () => {
      streamLoading = false
      streamError = false
    }

    streamOnErrorCb = () => {
      streamLoading = false
      streamError = true
    }

    streamOnLostDataCb = () => {
      streamLoading = false
      streamError = true
    }
  }

  regStreamingCallbacks()

  const resetStatus = (streaming: IWebAnchor) => {
    streamError = false
    streamLoading = false

    if (!streaming || streaming?.liveStatus !== StreamLiveStatus.LIVE) {
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

  $: isLive = streaming?.liveStatus === StreamLiveStatus.LIVE

  $: isMatchType = streaming?.sid !== SID.deposit

  $: badgeStr = isMatchType ? SIDi18nKey[streaming?.sid] : `common.depositWithdraw`

  $: borderStyle = isLive ? 'border-imprimary' : 'border-transparent'
</script>

{#if loading}
  <Loading />
{:else if streaming}
  <!-- {#if !streamError} -->
  <div class="relative min-h-[200px]">
    {#if streaming?.liveStatus === StreamLiveStatus.LIVE && streamLoading}
      <div class="absolute z-10 inset-0 bg-white flex items-center justify-center">
        <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden">
          <Circle stroke="rgb(var(--im-monorepo-primary))" />
        </div>
      </div>
    {/if}

    <div class="relative" on:click={() => navigationAnchor(isMatchType, match, streaming.houseId)} on:keypress>
      <InStreamingPlayer
        {streaming}
        onReadyCallback={streamOnReadyCb}
        onErrorCallback={streamOnErrorCb}
        onLostDataCallback={streamOnLostDataCb}
      />

      <div class="absolute top-0 left-0 z-[1] lg:bottom-4 lg:left-5 lg:top-auto">
        <AnchorLiveBadge class="rounded-none rounded-br-lg lg:rounded" />
      </div>
    </div>

    <div class="bg-white px-3 py-2 space-y-2 rounded-b-[20px]">
      {#if streaming}
        <div class="flex items-center">
          <AnchorImage src={streaming?.userImage} class={twMerge('flex-none block w-[38px] h-[38px]', borderStyle)} borderWidth={2} />

          <div class="ml-3 max-w-[calc(100%_-_76px)]" on:click={() => navigationAnchor(isMatchType, match, streaming.houseId)} on:keypress>
            <div class="leading-[18px] truncate">
              {#if matchLoading}
                <div class="bg-[#eee] animate-pulse h-[15px] rounded-md" />
              {:else if match}
                {match.homeName} VS {match.awayName}
              {:else}
                {streaming?.houseName}
              {/if}
            </div>

            <div class="leading-[15px] text-[14px] text-[#999] truncate">
              {streaming?.nickName}
            </div>
          </div>

          <div class="flex-auto text-right min-w-[36px]">
            <Badget
              class="rounded-[12px] leading-3 h-[20px] text-[14px] flex-auto text-right px-2"
              background={isMatchType
                ? `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`
                : `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)`}
            >
              {$t(badgeStr)}
            </Badget>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <!-- {/if} -->
{:else}
  <div />
{/if}
