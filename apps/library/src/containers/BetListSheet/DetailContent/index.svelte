<script lang="ts">
  import { im } from 'api'
  import { im as imWs } from 'api/wsMaster'
  import { im as impb } from 'protobuf'

  import { getOrdersInfo, getInfo } from '$containers/Chatroom/context'

  import Container from './Container.svelte'

  import type { IFetchData, IBetOrder } from 'api/im/types'

  export let betData: IBetOrder
  export let self: boolean

  const { selfOrdersCallback } = getOrdersInfo()
  const { chatId, iid } = getInfo()

  const Self = () => import('./Self.svelte')
  const Other = () => import('./Other.svelte')

  const loadingComponent = async (_self: typeof self) => {
    const loader = self ? Self : Other
    const comp = await loader()
    return comp.default
  }

  let fetchData: { loading: boolean; data: IFetchData } = {
    loading: true,
    data: undefined
  }

  const fetchSelfOrders = async () => {
    fetchData.loading = true

    const mock = localStorage.getItem('mock') === 'true' || false

    let res = { data: { list: [] } }
    if (mock) res = await im.chatroomSelfOrders({ query: { iid: $iid } })
    else res.data.list = await $selfOrdersCallback()

    if (!self) return

    fetchData.data = res.data
    fetchData.loading = false
  }

  const fetchOtherOrders = async () => {
    fetchData.loading = true

    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_OTHER_ORDERS,
      data: {
        chatId: $chatId || String($iid),
        iid: $iid
      }
    })

    if (self) return

    fetchData.data = {
      list: res.data.pushMessageEntity.map((e) => {
        let content = {}
        try {
          content = JSON.parse(e.content)
        } catch (error) {
          console.error(error)
        }

        return {
          ...content,
          // other orders display need
          senderName: e.senderName,
          vip: e.vip
        }
      })
    }
    fetchData.loading = false
  }

  $: lazyLoading = loadingComponent(self)

  $: {
    if (self) fetchSelfOrders()
    else fetchOtherOrders()
  }
</script>

{#await lazyLoading then comp}
  <Container bind:betData {fetchData} let:betItem>
    <svelte:component this={comp} {betItem} />
  </Container>
{/await}
