<script lang="ts">
  import { im } from 'api'
  import { Ripple } from 'ui'
  import { onDestroy } from 'svelte'
  import { portal } from "svelte-portal"
  import BottomSheet, { Header, Content } from 'ui/components/BottomSheet'

  import { dataCid } from '../BottomNavigation'
  import { locale } from '$stores'

  import DetailHeader from './DetailHeader.svelte'
  import DetailContent from './DetailContent.svelte'

  import Loading from './Loading.svelte'
  import Close from './images/close.svg'

  import type { ITabs } from './types'

  import { CODE_STATUS_OK } from '$src/constant'

  export let open: boolean
  export let houseId: string

  const tabs: ITabs = {
    'anchor.matches': () => import('$containers/AnchorMatches'),
    'anchor.personal': () => import('./Personal/index.svelte'),
    'anchor.life': () => import('./Life/index.svelte')
  }

  let activedTab: keyof typeof tabs = 'anchor.matches'

  let detailPromise: ReturnType<typeof im.webAnchorDetail>
  $: if (open)
    detailPromise = im.webAnchorDetail({
      query: { houseId },
      headers: { 'Accept-Language': $locale }
    })

  let onMax: boolean = false
  const clearZIndexOfBottomNav = () => {
    if (!onMax) return

    const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
    if (!bottomNav) return
    bottomNav.style.zIndex = ''
    onMax = false
  }

  const setZIndexOfBottomNav = (zIndex: string) => {
    const bottomNav = document.querySelector(`[data-cid="${dataCid}"]`)?.firstChild as HTMLElement
    if (!bottomNav) return
    bottomNav.style.zIndex = zIndex
    onMax = true
  }

  const onMaxHeight = () => setZIndexOfBottomNav('51')

  $: if (!open) clearZIndexOfBottomNav()
  onDestroy(() => clearZIndexOfBottomNav())
</script>


<main use:portal class='im-library'>
  <BottomSheet
    class={onMax && 'rounded-none'}
    dragBar
    bind:open
    initHeight={(height) => (height * 3) / 4}
    maxHeight={(height) => height + 20}
    {onMaxHeight}
  >
    <Header class="mt-[5px] bg-white px-[15px]">
      <div class="flex justify-end">
        <Ripple on:click={() => (open = false)}>
          <Close width={20} height={20} fill="#666666" />
        </Ripple>
      </div>
    </Header>

    {#await detailPromise}
      <Loading />
    {:then detail}
      {@const { data, code } = detail || {}}

      {#if code === CODE_STATUS_OK}
        <DetailHeader detail={data} bind:activedTab tabs={Object.keys(tabs)} />

        <Content>
          <DetailContent {activedTab} {tabs} {houseId} />
          {#if onMax}
            <div class="min-h-[75px]" />
          {/if}
        </Content>
      {/if}
    {/await}
  </BottomSheet>
</main>
