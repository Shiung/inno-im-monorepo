<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import BottomSheet, { Header, Content, Footer } from 'ui/components/BottomSheet'
  import { dataCid } from '../BottomNavigation'
  import stomp from 'api/stompMaster'
  import { getInfo } from '$containers/Chatroom/context'

  import DetailHeader from './DetailHeader/index.svelte'
  import DetailContent from './DetailContent/index.svelte'
  import DetailFooter from './DetailFooter/index.svelte'

  import type { ITabs } from './types'

  export let open: boolean
  export let destination: string
  export let subId: string
  const dispatch = createEventDispatcher()

  const tabs: ITabs = {
    'chat.betList': () => import('./DetailContent/Self/index.svelte'),
    'chat.otherBetList': () => import('./DetailContent/Other/index.svelte')
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

  let betData
  const { userId } = getInfo()

  const handleFollowOrder = () => {
    console.log('click followOrder');
  }

  const handleShowOrder = () => {
    stomp.publish({
      destination,
      headers: { id: subId },
      body: JSON.stringify({ message: betData, userId: $userId })
    })
    betData = null
    open = false
    setTimeout(() => {
      dispatch('deactivate')
    }, 500)
  }

  const publishMessage = () => {
    if (!betData) return
    if (self) return handleShowOrder()
    handleFollowOrder()
  }

  $: self = activedTab === 'chat.betList'
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
  <Header class="py-[9px] bg-white px-[15px]">
    <DetailHeader bind:activedTab tabs={Object.keys(tabs)} />
  </Header>

  <Content class="p-0">
    <DetailContent bind:betData {activedTab} {tabs} />
  </Content>

  <Footer class="p-0 bg-white">
    <DetailFooter
      on:click={publishMessage}
      selected={!!betData}
      {self}
    />
  </Footer>
</BottomSheet>
