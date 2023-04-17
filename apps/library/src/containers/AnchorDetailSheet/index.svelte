<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import { onDestroy } from 'svelte'
import BottomSheet, { Header, Content } from 'ui/components/BottomSheet'
import { dataCid } from '../BottomNavigation'

import DetailHeader from './DetailHeader.svelte'
import DetailContent from './DetailContent.svelte'

import Loading from './Loading.svelte'
import Close from './images/close.svg'


import type { withData, IWebAnchorDetail } from 'api/im/types'

export let open: boolean
export let houseId: string

const tabs = {
  'anchor.matches': () => import('$containers/AnchorMatches'),
  'anchor.personal': () => import('./Personal/index.svelte'),
  'anchor.life': () => import('./Life/index.svelte')
}

let activedTab: keyof typeof tabs = 'anchor.personal'

let detailPromise: Promise<withData<IWebAnchorDetail>>
$: if (open) detailPromise = im.webAnchorsDetail({ query: { houseId }})


let onMax: boolean = false
const clearZIndexOfBottomNav = () => {
  if (!onMax) return
  const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
  bottomNav.style.zIndex = ''
  onMax = false
}

const setZIndexOfBottomNav = (zIndex: string) => {
  const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
  bottomNav.style.zIndex = zIndex
  onMax = true
}

const onMaxHeight = () => setZIndexOfBottomNav('51')

$: if (!open) clearZIndexOfBottomNav()
onDestroy(() => clearZIndexOfBottomNav())

</script>

<BottomSheet
  class={onMax && 'rounded-none'}
  dragBar
  open={open}
  initHeight={(height) => height * 3/4}
  maxHeight={(height) => height + 20}
  onMaxHeight={onMaxHeight}
>
  <Header class='mt-[5px] bg-white px-[15px]'>
    <div class='flex justify-between'>
      <div />
      <Ripple on:click={() => open = false}>
        <Close width={20} height={20} fill='#666666' />
      </Ripple>
    </div>
  </Header>

  {#await detailPromise}
    <Loading />

  {:then detail}

    <DetailHeader detail={detail.data} bind:activedTab={activedTab} tabs={Object.keys(tabs)} />
    <Content>
      <DetailContent activedTab={activedTab} tabs={tabs} detail={detail.data} />
      {#if onMax}
        <div class='min-h-[75px]' />
      {/if}
    </Content>

  {/await}

</BottomSheet>
