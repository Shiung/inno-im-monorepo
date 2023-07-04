<script lang="ts">
  import Pc from './Pc.svelte'
  import Wap from './Wap.svelte'

  import { Header, Content, Footer } from 'ui/components/BottomSheet'
  import { getInfo } from '$containers/Chatroom/context'
  import { chatEnv } from '$containers/Chatroom/controller'
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

  const Container = $chatEnv.device === 'pc' ? Pc : Wap

  const tabs: ITabs = {
    'chat.betList': () => import('./DetailContent/Self.svelte'),
    'chat.otherBetList': () => import('./DetailContent/Other.svelte')
  }

  let activedTab: keyof typeof tabs = 'chat.betList'

  let betData: IBetOrder

  const handleFollowOrder = () => {
    console.log('click followOrder')
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
      content: JSON.stringify(waitSendMessage)
    }

    const res = await imWs.publish({
      pairId: now,
      eventkey,
      data
    })

    console.log('publish res: ', res)

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
</script>

<svelte:component this={Container} bind:open>
  <Header class="py-[9px] bg-white px-[15px]">
    <DetailHeader bind:activedTab tabs={Object.keys(tabs)} />
  </Header>

  <Content class="p-0">
    <DetailContent bind:betData {self} />
  </Content>

  <Footer class="p-0 bg-white">
    <DetailFooter on:click={publishMessage} selected={!!betData} {self} {loading} />
  </Footer>
</svelte:component>
