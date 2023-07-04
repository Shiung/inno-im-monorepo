<script lang="ts">
  import { im } from 'api'
  import { twMerge } from 'tailwind-merge'
  import { onDestroy, onMount } from 'svelte'
  import { locale } from '$stores'
  import Chatroom, {
    setChatEnv,
    setChatInfo,
    controller,
    // setChatUserInfo,
    setChatOrdersInfo,
    onSizeChangedCallback,
    onToggledCallback,
    type SizeChangedOption
  } from '$src/containers/Chatroom'

  import type { ISportMarketSummary } from '$containers/BetDetail/types'

  const isWindow: boolean = true
  let expandType: string = 'default'
  let dom: HTMLDivElement
  let changedHeight: number
  let videoPlay: boolean = false
  let isTransition: boolean = false
  let sportMarketSummary: ISportMarketSummary
  let selfOrdersCallback: () => Promise<any>

  $: initHeight = dom?.getBoundingClientRect().height

  $: changedHeight = initHeight

  $: if (dom) {
    setChatEnv({
      displayType: isWindow ? 'window' : 'block',
      height: initHeight,
      isOpen: false,
      showBetList: false,
      device: 'wap',
      useScrollCollapse: true,
      animation: true
    })

    setChatInfo({
      chatId: '9434287',
      // iid: 9433737,
      vipLimit: 0,
      frequency: 0
    })

    controller.setChatUserInfo({
      userAccount: 'bltest01',
      userToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiMDgxODkxZmYtYWFkZi00YTMzLWJhMTMtNzJiMjAyMWQ4MTY4IiwidmVuZG9ySWQiOjEsInR5cGUiOjEsInVzZXJJZCI6MzA3Njg3LCJsb2dpbkRvbWFpbiI6ImVuLXZkMDAxLXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg4MzU0ODQ3MDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMTU0MDk2MDAwLCJ2ZW5kb3IiOiJkdjIiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJibHRlc3QwMSJ9.ldXY1Dhe39X2rsoMhnQY2xInZsgtA4lWedkxqfoY_r0',
      userVip: 10,
      userCurrency: 'CNY'
    })

    setTimeout(() => {
      console.log('=================================chatId chaged================================')
      setChatInfo({
        chatId: '0011227'
      })
    }, 3000)
  }

  $: setChatEnv({ height: changedHeight, size: expandType as any })
  $: setChatOrdersInfo({ sportMarketSummary, selfOrdersCallback })

  onSizeChangedCallback((option: SizeChangedOption) => {
    isTransition = option.transition

    switch (option.size) {
      case 'default':
        expandType = 'default'
        break
      case 'normal':
        expandType = 'normal'
        changedHeight = initHeight
        break
      case 'expand':
        if (videoPlay) return
        expandType = 'expand'
        changedHeight = 0
        break
    }
  })

  onToggledCallback((open) => {
    setChatEnv({ isOpen: open })
  })

  const fetchMarket = async () => {
    const lang = $locale.toLowerCase().replace(/_/g, '-')
    const res = await fetch(
      `https://tiger-api.innodev.site/platform/systatus/proxy/sports/dev/Java/json/${lang}/market_property_setting`
    ).then((res) => res.json())
    sportMarketSummary = res
  }

  const fetchSelfOrders = async () => {
    const res = await im.chatroomSelfOrders({ query: { iid: 1 } })
    return res.data.list
  }

  onMount(async () => {
    await fetchMarket()
    controller.active()
    selfOrdersCallback = fetchSelfOrders
  })

  onDestroy(() => {
    controller.destory()
  })
</script>

<div class={!isWindow && expandType !== 'default' && 'fixed w-full top-0'}>
  <div
    class={twMerge(
      'w-full bg-white h-[200px] duration-300',
      isWindow && expandType !== 'default' && 'fixed z-30',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    bind:this={dom}
    style:height={expandType !== 'default' ? `${changedHeight}px` : ''}
    style:overflow={!isWindow ? 'hidden' : ''}
  >
    this platform area
  </div>
  <div
    class={twMerge('duration-300', isTransition ? 'transition-[height]' : 'transition-none')}
    style:height={isWindow && expandType !== 'default' ? `${changedHeight}px` : ''}
  />

  <div class={twMerge('h-[2000px] bg-red-500', expandType !== 'default' ? 'fixed left-0 right-0' : 'static')} />
</div>

<div
  class={twMerge(!isWindow && 'fixed bottom-0 w-full transition-[top] duration-300')}
  style:top={!isWindow ? `${changedHeight}px` : ''}
>
  <Chatroom />
