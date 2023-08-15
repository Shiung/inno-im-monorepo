<script lang="ts">
  import { Ripple, Badget } from 'ui'
  import type { IWebAnchor } from 'api/im/types'
  import Circle from 'ui/core/button/loading.svelte'

  import InStreamingPlayer, { isFlvUse } from '$containers/InStreamingPlayer'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import { t } from '$stores'
  import { SIDi18nKey, SID, StreamLiveStatus } from '$src/constant'
  import { twMerge } from 'tailwind-merge'

  import Loading from './Loading.svelte'
  import { getAnchorStore } from '../store'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'
  import { navigationAnchor } from '$src/utils/anchor'

  const { anchorMatches, anchorMatchLoadings } = getAnchorStore()

  export let streaming: IWebAnchor
  export let loading: boolean

  let streamLoading = false
  let streamError = false
  let openDetailSheet = false
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

  const onStreamingClick = () => navigationAnchor(isMatchType, match, streaming.houseId)

  $: resetStatus(streaming)

  $: match = $anchorMatches[streaming?.houseId]

  $: matchLoading = $anchorMatchLoadings[streaming?.houseId]

  $: isLive = streaming?.liveStatus === StreamLiveStatus.LIVE

  $: isMatchType = streaming?.sid !== SID.deposit

  $: badgeStr = isMatchType ? SIDi18nKey[streaming?.sid] : `common.depositWithdraw`

  $: borderStyle = isLive ? 'border-imprimary' : 'border-transparent'
</script>

<div data-cid="StreamBlock" data-houseId={streaming?.houseId} data-iid={match?.iid}>
  {#if loading}
    <Loading />
  {:else if streaming}
    <!-- {#if !streamError} -->
    <div class="min-h-[200px]">
      <Ripple class="flex w-full relative" on:click={onStreamingClick}>
        {#if streaming?.liveStatus === StreamLiveStatus.LIVE && streamLoading}
          <div class="absolute z-10 inset-0 bg-white flex items-center justify-center">
            <div class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden">
              <Circle stroke="rgb(var(--im-monorepo-primary))" />
            </div>
          </div>
        {/if}

        <InStreamingPlayer
          {streaming}
          onReadyCallback={streamOnReadyCb}
          onErrorCallback={streamOnErrorCb}
          onLostDataCallback={streamOnLostDataCb}
        />
        
        {#if streaming?.liveStatus === StreamLiveStatus.LIVE}
          <div class="absolute top-0 left-0 z-[1] lg:bottom-4 lg:left-5 lg:top-auto">
            <AnchorLiveBadge class="rounded-none rounded-br-lg lg:rounded" />
          </div>
        {/if}
      </Ripple>

      <Ripple class="flex w-full bg-white px-3 py-2 space-y-2 rounded-b-[20px] lg:rounded-b-[10px]" on:click={onStreamingClick}>
        {#if streaming}
          <div class="flex flex-1 items-center max-w-full">
            <Ripple class='flex justify-center items-center rounded-full im-shadow' on:click={() => (openDetailSheet = true)}>
              <AnchorImage src={streaming?.userImage} class={twMerge('block w-[38px] h-[38px] !shadow-none', borderStyle)} borderWidth={2} />
            </Ripple>

            <div class="flex justify-between items-center flex-1 ml-3 overflow-hidden">
              <div class="flex-1 overflow-hidden text-left">
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

              <Badget
                class="rounded-[12px] leading-3 h-[20px] text-[14px] flex-none text-right px-2"
                background={isMatchType
                  ? `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`
                  : `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)`}
              >
                {$t(badgeStr)}
              </Badget>
            </div>
          </div>
        {/if}
      </Ripple>
    </div>
    <!-- {/if} -->

    <AnchorDetailSheet bind:open={openDetailSheet} houseId={streaming?.houseId} />
  {/if}
</div>