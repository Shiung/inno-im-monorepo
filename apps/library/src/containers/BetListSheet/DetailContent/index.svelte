<script lang="ts">
  import { im } from 'api'
  import { getInfo } from '$containers/Chatroom/context'
  import { locale } from '$stores'

  import type { IChatroomSelfOrders, IWebAnchorLife, IWebAnchorInfo } from 'api/im/types'
  import type { ITabs } from '../types'

  export let tabs: ITabs
  export let activedTab: keyof typeof tabs
  export let betData: string

  const { sportMarketSummary } = getInfo()

  const loadingComponent = async (_activeTab: typeof activedTab) => {
    if (!activedTab) return
    const loader = tabs[activedTab]
    const comp = await loader()
    return comp.default
  }

  $: lazyLoading = loadingComponent(activedTab)

  let self: { loading: boolean; data: IChatroomSelfOrders['res']['data'] } = {
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
    if (self.data) return
    self.loading = true

    $sportMarketSummary || (await fetchMarket())
    const res = await im.chatroomSelfOrders({ query: { iid: 1, quantity: 0 } })

    self.data = res?.data
    self.loading = false
  }

  let personal: { loading: boolean; data: IWebAnchorInfo['res']['data'] } = {
    loading: true,
    data: undefined
  }
  const fetchOtherOrders = async () => {
    // if (personal.data) return
    //   personal.loading = true
    //   const res = await im.webAnchorInfo({ query: { houseId }})
    //   personal.data = res?.data
    //   personal.loading = false
  }

  $: {
    if (activedTab === 'chat.betList') fetchSelfOrders()
    else if (activedTab === 'chat.otherBetList') fetchOtherOrders()
  }
</script>

{#await lazyLoading then comp}
  {#if activedTab === 'chat.betList'}
    <svelte:component this={comp} bind:betData {self} />
  {:else if activedTab === 'chat.otherBetList'}
    <svelte:component this={comp} bind:betData />
  {/if}
{/await}
