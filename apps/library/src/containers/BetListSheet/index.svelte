<script lang="ts">
  import Pc from './Pc.svelte'
  import Wap from './Wap.svelte'

  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Header, Content, Footer } from 'ui/components/BottomSheet'
  import { getInfo, getEnv } from '$containers/Chatroom/context'

  import DetailHeader from './DetailHeader/index.svelte'
  import DetailContent from './DetailContent/index.svelte'
  import DetailFooter from './DetailFooter/index.svelte'

  import type { ITabs } from './types'

  export let open: boolean
  const dispatch = createEventDispatcher()
  const { device } = getEnv()
  const Container = $device === 'pc' ? Pc : Wap

  const tabs: ITabs = {
    'chat.betList': () => import('./DetailContent/Self.svelte'),
    'chat.otherBetList': () => import('./DetailContent/Other.svelte')
  }

  let activedTab: keyof typeof tabs = 'chat.betList'

  let betData
  const { userId } = getInfo()

  const handleFollowOrder = () => {
    console.log('click followOrder')
  }

  const handleShowOrder = () => {
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
</script>

<svelte:component this={Container} bind:open>
  <Header class="py-[9px] bg-white px-[15px]">
    <DetailHeader bind:activedTab tabs={Object.keys(tabs)} />
  </Header>

  <Content class="p-0">
    <DetailContent bind:betData {self}/>
  </Content>

  <Footer class="p-0 bg-white">
    <DetailFooter on:click={publishMessage} selected={!!betData} {self} />
  </Footer>
</svelte:component>
