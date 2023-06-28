<script lang="ts">
  import { im } from 'api'
  import { getOrdersInfo } from '$containers/Chatroom/context'
  import Container from './Container.svelte'

  import type { IFetchData, IBetOrder } from 'api/im/types'

  export let betData: IBetOrder
  export let self: boolean

  const { selfOrdersCallback } = getOrdersInfo()

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
    const res = mock ? await im.chatroomSelfOrders({ query: { iid: 1 } }) : await $selfOrdersCallback()

    fetchData.data = res.data
    fetchData.loading = false
  }

  const fetchOtherOrders = async () => {
    fetchData.loading = true

    const res = await im.chatroomOtherOrders({ query: { iid: 1 } })

    fetchData.data = res.data
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
