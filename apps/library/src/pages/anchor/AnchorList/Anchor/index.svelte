<script lang="ts">
  import { onDestroy } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { Ripple, Badget } from 'ui'
  import type { IWebAnchor, IWebAnchorMatch } from 'api/im/types'

  import AnchorMatches from '$containers/AnchorMatches'
  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorPreviewer from '$containers/AnchorPreviewer'

  import { t, locale, goDetailCallback } from '$stores'
  import { SIDi18nKey, SID } from '$src/constant'
  import { goSportDetailHOF } from '$src/utils/match'
  
  import Arrow from '../images/arrow_down_small.svg'
  import MatchHistory from '../images/matchHistory.svg'
  import { fetchAnchorMatches } from '../utils'
  import { PREVIEW_BAR_TOP_RATIO, PREVIEW_BAR_WIDTH } from '../previewConfig'

  export let anchor: IWebAnchor
  export let preview: boolean = false

  let showMatchList: boolean
  let openDetailSheet: boolean
  let dom: HTMLDivElement
  let firstMatch: IWebAnchorMatch = null
  let restMatchList: IWebAnchorMatch[] = []
  let loading: boolean = true
  let matchObserver: IntersectionObserver

  const createMatchObserver = (dom: HTMLDivElement) => {
    if (!dom) return

    let isFetched: boolean = false
    const matchObserver = new IntersectionObserver(
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

    return matchObserver
  }

  const resetMatchObserverIfExisted = () => {
    matchObserver && matchObserver.disconnect()
  }

  const onAnchorClick = () => {
    if(isMatchType) {
      if (firstMatch) goSportDetailHOF(firstMatch, $goDetailCallback)
    } else {
      push(`/anchorChat/${anchor.houseId}`)
    }
  }

  const init = (dom: HTMLDivElement, isMatchType: boolean) => {
    if (!isMatchType || !anchor.matchCount) return (loading = false)

    matchObserver = createMatchObserver(dom)
  }

  $: isMatchType = anchor.sid !== SID.deposit

  $: init(dom, isMatchType)

  $: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.depositWithdraw`

  onDestroy(() => {
    resetMatchObserverIfExisted()
  })
</script>

<div data-id={anchor.houseId} bind:this={dom}>
  <Ripple class='flex w-full im-shadow h-[97px] rounded-[10px] p-0' on:click={onAnchorClick}>
    <AnchorPreviewer
      {anchor}
      {preview}
      {isMatchType}
      previewableTopRatio={PREVIEW_BAR_TOP_RATIO}
      previewableWidth={PREVIEW_BAR_WIDTH}
      previewClass='flex items-center w-[144px]'
      class='p-2'
      on:preview
    >
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-1 flex-col items-start overflow-hidden space-y-1">
          <div class="flex w-full items-center space-x-1">
            <Ripple on:click={() => openDetailSheet = true} class="w-[19px] h-[19px] border border-imprimary rounded-full p-[1px] flex-none">
              <AnchorImage
                src={anchor.userImage}
                class='block w-full h-auto rounded-full'
              />
            </Ripple>

            <span class="text-imprimary leading-[18px] text-[18px] truncate"> {anchor.houseName} </span>
          </div>
  
          <div class="w-full text-left leading-[17px] text-[12px] text-[#999] truncate">
            {#if loading}
              <div class="bg-[#eee] animate-pulse h-[17px] rounded-md" />
            {:else if firstMatch}
              {firstMatch.homeName} VS {firstMatch.awayName}
            {:else}
              {anchor.nickName}
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
    </AnchorPreviewer>
  </Ripple>

  {#if showMatchList}
    <AnchorMatches data={restMatchList} />
  {/if}
  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>