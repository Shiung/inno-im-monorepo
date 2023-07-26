<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { push } from 'svelte-spa-router'
  import { Ripple, Badget } from 'ui'
  import type { IWebAnchor, IWebAnchorMatch } from 'api/im/types'

  import AnchorMatches from '$containers/AnchorMatches'
  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import StreamingPlayer, {
    onError,
    onReady,
    onLostData
  } from '$containers/StreamingPlayer'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorUserImage from '$containers/AnchorUserImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'

  import { t, locale, goDetailCallback } from '$stores'
  import { SIDi18nKey, SID } from '$src/constant'
  
  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from '../config'
  import Arrow from '../images/arrow_down_small.svg'
  import MatchHistory from '../images/matchHistory.svg'
  import { fetchAnchorMatches } from '../utils'

  export let anchor: IWebAnchor
  export let preview: boolean = false

  let showMatchList: boolean
  let openDetailSheet: boolean
  let dom: HTMLDivElement
  let firstMatch: IWebAnchorMatch = null
  let restMatchList: IWebAnchorMatch[] = []
  let loading: boolean = true
  let matchObserver: IntersectionObserver
  let previewObserver: IntersectionObserver

  const dispatch = createEventDispatcher()

  const createMatchObserver = (dom: HTMLDivElement) => {
    if (!dom) return

    let isFetched: boolean = false
    matchObserver = new IntersectionObserver(
      async (entries) => {
        if (isFetched) return

        for (const entry of entries) {
          if (entry.isIntersecting) {
            loading = true
            const [first, ...rest] = await fetchAnchorMatches(anchor.houseId, $locale)
            loading = false

            firstMatch = first
            restMatchList = rest
            isFetched = true
          }
        }
      },
      { rootMargin: `0px 0px 500px 0px` }
    )

    matchObserver.observe(dom)
  }

  const createPreviewObserver = (dom: HTMLDivElement) => {
    if (!dom) return

    let marginTop = PREVIEW_BAR_TOP_RATIO * 100
    let marginBottom = Math.floor(((window.innerHeight * (1 - PREVIEW_BAR_TOP_RATIO) - PREVIEW_BAR_WIDTH) / window.innerHeight) * 100)

    previewObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && window.scrollY !== 0) {
            dispatch('preview', anchor.houseId)
          }
        }
      },
      { root: null, rootMargin: `${-marginTop}% 0% ${-marginBottom}% 0%` }
    )

    previewObserver.observe(dom)
  }

  const init = (dom: HTMLDivElement, isMatchType: boolean) => {
    if (!isMatchType || !anchor.matchCount) return (loading = false)

    createMatchObserver(dom)
  }

  const regStreamingCallbacks = (active: boolean) => {
    if(!active) return

    streamingLoading = true

    onReady(() => {
      streamingLoading = false
      streamingError = false
    })

    onError(() => {
      streamingLoading = false
      streamingError = true
    })

    onLostData(() => {
      streamingLoading = false
      streamingError = true
    })
  }

  $: isMatchType = anchor.sid !== SID.deposit

  $: init(dom, isMatchType)

  $: createPreviewObserver(dom)

  $: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.depositWithdraw`

  let streamingLoading: boolean = false
  let streamingError: boolean = false

  $: isLive = anchor.liveStatus === 2
  $: isPreviewing = preview && isLive

  $: regStreamingCallbacks(isPreviewing)

  const onAnchorClick = () => {
    if(isMatchType) {
      $goDetailCallback({
        matchId: firstMatch.mid,
        matchTime: firstMatch.matchTime,
        vd: firstMatch.vd
      })
    } else {
      push(`/anchorChat/${anchor.houseId}`)
    }
  }
  onDestroy(() => {
    matchObserver && matchObserver.disconnect()
    previewObserver && previewObserver.disconnect()
  })
</script>

<div data-id={anchor.houseId} bind:this={dom}>
  <Ripple class="flex w-full im-shadow h-[97px] rounded-[10px] px-[8px] space-x-2" on:click={onAnchorClick}>
    <div class="flex flex-none items-center relative">
      {#if isLive}
        <div class="absolute top-0 left-0 z-10">
          <AnchorLiveBadge />
        </div>
      {/if}

      {#if !isPreviewing || streamingLoading}
        <div out:fade|local={{ duration: 250 }} class='absolute'>
          <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} />
        </div>
      {/if}

      <div class="w-[143px] h-[80px] rounded-[10px] overflow-hidden">
        {#if isPreviewing}
          <StreamingPlayer streaming={anchor} />
        {/if}
      </div>
    </div>

    <div class="flex-1 flex flex-col justify-between py-[10px] overflow-hidden">
      <div class="flex flex-1 flex-col items-start overflow-hidden space-y-1">
        <div class="flex w-full items-center space-x-1">
          <AnchorImage src={anchor.userImage} class="w-[19px] h-[19px] border border-imprimary rounded-full p-[1px]" />
          <span class="text-imprimary leading-[18px] text-[18px] truncate"> {anchor.houseName} </span>
        </div>

        <div class="w-full text-left leading-[17px] text-[12px] text-[#999] truncate">
          {#if loading}
            <div class="bg-[#eee] animate-pulse h-[17px] rounded-md" />
          {:else if !isMatchType}
            {anchor.houseIntroduction}
          {:else if firstMatch}
            {firstMatch.homeName} VS {firstMatch.awayName}
          {/if}
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

      <div class="flex items-center justify-end">
        {#if loading}
          <div class='w-[45px] h-[18px] bg-[#eee] animate-pulse rounded-md'></div>
        {:else if restMatchList.length}
          <div class="rounded-[5px] overflow-hidden" style:background-color="rgb(var(--im-monorepo-primary) / 0.1)">
            <Ripple class="flex items-center h-[18px] px-1 space-x-1" ripple="#eeeeee" on:click={() => (showMatchList = !showMatchList)}>
              <MatchHistory width={10} height={10} />
              <span class="leading-[18px] text-[10px] text-imprimary">{restMatchList.length}</span>
              <div class="duration-300" style:transform={showMatchList ? 'rotate(180deg)' : ''}>
                <Arrow width={13} height={14} fill="rgb(var(--im-monorepo-primary))" />
              </div>
            </Ripple>
          </div>
        {/if}
      </div>
    </div>
  </Ripple>

  {#if showMatchList}
    <AnchorMatches data={restMatchList} />
  {/if}
  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>
