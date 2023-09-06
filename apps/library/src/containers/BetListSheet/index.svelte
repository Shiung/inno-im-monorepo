<script lang="ts">
  import Pc from './Pc.svelte'
  import Wap from './Wap.svelte'

  import { Header, Content, Footer } from 'ui/components/BottomSheet'
  import { getInfo, getOrdersInfo } from '$containers/Chatroom/context'
  import { isXl } from '$stores'
  import { im as imWs } from 'api/wsMaster'
  import { im } from 'protobuf'

  import DetailHeader from './DetailHeader/index.svelte'
  import DetailContent from './DetailContent/index.svelte'
  import DetailFooter from './DetailFooter/index.svelte'

  import type { ITabs } from './types'
  import type { IBetOrder } from 'api/im/types'

  export let open: boolean

  let loading: boolean = false

  const { chatId, iid } = getInfo()
  const { followOrdersCallback } = getOrdersInfo()

  $: Container = $isXl ? Pc : Wap

  const tabs: ITabs = {
    'chat.betList': () => import('./DetailContent/Self.svelte'),
    'chat.otherBetList': () => import('./DetailContent/Other.svelte')
  }

  let activedTab: keyof typeof tabs = 'chat.betList'

  let betData: IBetOrder

  const handleFollowOrder = async () => {
    const waitSendMessage = betData
    loading = true
    await $followOrdersCallback(waitSendMessage)
    loading = false
    open = false
    betData = null
  }

  const handleShowOrder = async () => {
    loading = true

    const eventkey = im.enum.command.SEND_MESSAGE
    const waitSendMessage = betData
    const now = Date.now()

    const data = {
      contentType: im.enum.contentType.ORDER,
      chatId: $chatId || String($iid),
      iid: $iid,
      content: JSON.stringify(waitSendMessage),
      ...($chatId && { houseId: $chatId })
    }

    const res = await imWs.publish({
      pairId: now,
      eventkey,
      data
    })

    loading = false
    open = false
    betData = null
  }

  const publishMessage = () => {
    if (!betData) return
    if (self) return handleShowOrder()
    handleFollowOrder()
  }

  $: self = activedTab === 'chat.betList'
  $: {
    // reset betData when activedTab change
    if (activedTab) {
      betData = null
    }
  }
</script>

<svelte:component this={Container} bind:open>
  <!-- TODO: will uncomment in 4.10.x -->
  <!-- <Header class="py-[9px] bg-white px-[15px]">
    <DetailHeader bind:activedTab tabs={Object.keys(tabs)} />
  </Header> -->
  <div class={$isXl ? 'py-2' : 'py-3'}></div>

  <Content class="px-[10px] overflow-x-hidden">
    <DetailContent bind:betData {self} />
  </Content>

  <Footer class="p-0 bg-white">
    <DetailFooter on:click={publishMessage} selected={!!betData} {self} {loading} />
  </Footer>
</svelte:component>
