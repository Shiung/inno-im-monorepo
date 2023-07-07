<script lang="ts">
  import { im } from 'api'
  import { twMerge } from 'tailwind-merge'
  import { onDestroy, onMount } from 'svelte'
  import { locale } from '$stores'
  import Chatroom, {
    controller,
    setChatInfo,
    setChatOrdersInfo,
    onSizeChangedCallback,
    onToggledCallback,
    type SizeChangedOption
  } from '$src/containers/Chatroom'

  import { getUser, type IUser } from './utils'

  import type { ISportMarketSummary } from '$containers/BetDetail/types'

  const isWindow: boolean = true
  let expandType: string = 'default'
  let dom: HTMLDivElement
  let changedHeight: number
  let videoPlay: boolean = false
  let isTransition: boolean = false
  let sportMarketSummary: ISportMarketSummary
  let selfOrdersCallback: () => Promise<any>
  let followOrdersCallback: (data) => void

  let user: IUser = { account: '', token: '' }

  $: initHeight = dom?.getBoundingClientRect().height

  $: changedHeight = initHeight

  $: if (dom) {
    controller.setChatEnv({
      device: 'wap',
      subscribeBindingChatroom: true
    })

    controller.setChatUserInfo({
      userAccount: user.account,
      userToken: user.token,
      userVip: 10,
      userCurrency: 'CNY'
    })

    setChatInfo({
      displayType: isWindow ? 'window' : 'block',
      useScrollCollapse: true,
      chatId: '9434287',
      height: initHeight,
      // iid: 9433737,
      isOpen: false,
      showBetList: false
    })
  }

  $: setChatInfo({ height: changedHeight, size: expandType as any })
  $: setChatOrdersInfo({ sportMarketSummary, selfOrdersCallback, followOrdersCallback })

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
    setChatInfo({ isOpen: open })
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

  const followOrders = (data) => {
    console.log(data, '這裡是跟單資料')
  }

  onMount(async () => {
    user = await getUser()
    await fetchMarket()
    controller.active()
    selfOrdersCallback = fetchSelfOrders
    followOrdersCallback = followOrders
  })

  onDestroy(() => {
    controller.destroy()
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

<div class={twMerge(!isWindow && 'fixed bottom-0 w-full transition-[top] duration-300')} style:top={!isWindow ? `${changedHeight}px` : ''}>
  <Chatroom />
</div>
