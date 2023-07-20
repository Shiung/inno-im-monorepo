<script lang='ts'>
import { onDestroy, createEventDispatcher } from 'svelte'
import { Ripple } from 'ui'
import AnchorUserImage from '$components/AnchorUserImage/index.svelte'
import AnchorMatches from '$containers/AnchorMatches/index.svelte'
import AnchorDetailSheet from '$containers/AnchorDetailSheet'
import StreamingPlayer from '$containers/StreamingPlayer'
import AnchorImage from '$components/AnchorImage'
import { Badget } from 'ui'
import { t } from '$stores'
import { locale } from '$stores'
import { im } from 'api'
import type { ILanguages } from 'env-config'
import type { IWebAnchorMatch } from 'api/im/types'
import Loading from './Loading.svelte'

import Arrow from '../images/arrow_down_small.svg'
import MatchHistory from '../images/matchHistory.svg'
import type { IWebAnchor } from 'api/im/types'
import { SIDi18nKey } from '$src/constant'


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

const fetchAnchorMatches = async (houseId: string, lang: ILanguages) => {
  const matchesPromise = await im.webAnchorMatchList({ query: { houseId }, headers: { 'Accept-Language': lang }})
  
  if(matchesPromise?.data?.matchList?.length > 0) {
    return { first: matchesPromise?.data?.matchList[0], rest: matchesPromise?.data?.matchList.slice(1)}
  }
  
  return { first: null, rest: [] }
}

const createMatchObserver = (dom: HTMLDivElement) => {
  if(!dom) return
  
  let isFetched: boolean = false
  matchObserver = new IntersectionObserver(async (entries) => {
    const { matchCount, houseId } = anchor
    if (isFetched) return

    if (!matchCount) {
      loading = false
      isFetched = true
      return
    }

    for (const entry of entries) {
      if (entry.isIntersecting) {
        loading = true
        const { first, rest } = await fetchAnchorMatches(houseId, $locale)
        loading = false
  
        firstMatch = first
        restMatchList = rest
        isFetched = true
      }
    }
  }, { rootMargin: `0px 0px 500px 0px`})

  matchObserver.observe(dom)
}

const createPreviewObserver = (dom: HTMLDivElement) => {
  if(!dom) return
  
  let marginTop = 30
  let marginBottom = ((window.innerHeight * 0.7 - 10) / window.innerHeight * 100).toFixed(2)

  previewObserver = new IntersectionObserver((entries) => {
    for(const entry of entries) {
      if (entry.isIntersecting && window.scrollY !== 0) {
        dispatch('preview', anchor.houseId)
      }
    }
  }, { root: null, rootMargin: `${-marginTop}% 0% ${-marginBottom}% 0%` })

  previewObserver.observe(dom)
}

const init = (dom: HTMLDivElement, isMatchType: boolean) => {
  if(!isMatchType) return (loading = false)

  createMatchObserver(dom)
}

$: isMatchType = anchor.sid !== 100

$: init(dom, isMatchType)

$: createPreviewObserver(dom)

$: badgeStr = isMatchType ? SIDi18nKey[anchor.sid] : `common.deposit`

onDestroy(() => {
  matchObserver && matchObserver.disconnect()
  previewObserver && previewObserver.disconnect()
})
</script>

<div data-id={anchor.houseId} bind:this={dom}>
  {#if loading}
    <Loading />
  {:else}
    <div class='flex im-shadow h-[97px] rounded-[10px] px-[8px] space-x-2'>
      <div class='flex flex-none items-center'>
        {#if preview && anchor.liveStatus === 2}
          <div class='w-[143px] h-[80px]'>
            <StreamingPlayer streaming={anchor} />
          </div>
        {:else}
          <AnchorUserImage user={anchor.userImage} type={isMatchType ? 'match' : 'deposit'} />
        {/if}
      </div>

      <div class='flex-1 flex flex-col justify-between py-[10px] overflow-hidden'>
        <div class='flex flex-1 flex-col items-start overflow-hidden'>
          <div class='flex items-center space-x-1'>
            <AnchorImage src={anchor.userImage} class='w-[19px] h-[19px] border border-imprimary rounded-full p-[1px]' />
            <span class='text-imprimary leading-[18px] text-[18px]'> {anchor.houseName} </span>
          </div>

          <div class='w-full leading-[17px] text-[12px] text-[#999] whitespace-nowrap text-ellipsis overflow-hidden'>
            {#if firstMatch}
              {firstMatch.homeName} VS {firstMatch.awayName}
            {:else}
              {anchor.houseIntroduction}
            {/if}
          </div>

          <Badget
            class='rounded-[6px] leading-3 h-3 text-[9px]'
            background={isMatchType ? `linear-gradient(108.1deg, #6AA1FF 0%, #FD99E1 100%)` : `linear-gradient(270deg, #84DFFF 0%, #50BDFF 100%)`}
          >
            {$t(badgeStr)}
          </Badget>
        </div>

        {#if restMatchList.length}
          <div class='flex items-center justify-end'>
            <div class='rounded-[5px] overflow-hidden' style:background-color='rgb(var(--im-monorepo-primary) / 0.1)'>
              <Ripple class='flex items-center h-[18px] px-1 space-x-1'
                ripple='#eeeeee'
                on:click={() => showMatchList = !showMatchList}
              > 
                <MatchHistory width={10} height={10} />
                <span class='leading-[18px] text-[10px] text-imprimary'>{restMatchList.length}</span>
                <div class='duration-300' style:transform={showMatchList ? 'rotate(180deg)' : ''}>
                  <Arrow width={13} height={14} fill='rgb(var(--im-monorepo-primary))' />
                </div>
              </Ripple>
            </div>
          </div>
        {/if}
      </div>
    
    </div>
  {/if}
  {#if showMatchList}
    <AnchorMatches data={restMatchList} />
  {/if}
  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />
</div>