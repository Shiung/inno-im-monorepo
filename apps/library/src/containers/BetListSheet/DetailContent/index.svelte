<script lang="ts">
  import { im } from 'api'
  import { getInfo } from '$containers/Chatroom/context'
  import { locale } from '$stores'
  import Container from './Container.svelte'

  import type { IFetchData, IBetOrder } from 'api/im/types'

  export let betData: IBetOrder
  export let self: boolean

  const { sportMarketSummary } = getInfo()

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
  const fetchMarket = async () => {
    const lang = $locale.toLowerCase().replace(/_/g, '-')
    $sportMarketSummary = await fetch(
      `https://tiger-api.innodev.site/platform/systatus/proxy/sports/dev/Java/json/${lang}/market_property_setting`
    ).then((res) => res.json())
  }

  const fetchSelfOrders = async () => {
    // if (fetchData.data) return
    fetchData.loading = true

    $sportMarketSummary || (await fetchMarket())
    const res = await im.chatroomSelfOrders({ query: { iid: 1 } })

    fetchData.data = res.data
    fetchData.loading = false
  }

  const fetchOtherOrders = async () => {
    // if (fetchData.data) return
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
