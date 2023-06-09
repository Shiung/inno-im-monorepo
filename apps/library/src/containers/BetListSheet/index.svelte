<script lang="ts">
  import { onDestroy } from 'svelte'
  import BottomSheet, { Header, Content, Footer } from 'ui/components/BottomSheet'
  import { dataCid } from '../BottomNavigation'

  import DetailHeader from './DetailHeader/index.svelte'
  import DetailFooter from './DetailFooter/index.svelte'

  import type { ITabs } from './types'

  export let open: boolean

  const tabs: ITabs = {
    'chat.betList': () => import('./DetailContent/index.svelte'),
    'chat.otherBetList': () => import('./DetailContent/index.svelte')
  }

  let activedTab: keyof typeof tabs = 'chat.betList'

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

<BottomSheet
  class={onMax && 'rounded-none'}
  dragBar
  bind:open
  initHeight={(height) => (height * 9) / 10}
  maxHeight={(height) => height + 20}
  {onMaxHeight}
>
  <Header class="py-[12px] bg-white px-[15px]">
    <DetailHeader bind:activedTab tabs={Object.keys(tabs)} />
  </Header>

  <Content>There is Content</Content>

  <Footer class="p-0 bg-white">
    <DetailFooter />
  </Footer>
</BottomSheet>
