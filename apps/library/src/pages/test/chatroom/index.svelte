<script lang="ts">
  import { im } from 'api'
  import { twMerge } from 'tailwind-merge'
  import { onDestroy, onMount } from 'svelte'
  import { locale, setUserAuth, setUserInfo, setGoDeposit, setGoVipCenter, setGoLogin } from '$stores'
  import Chatroom, {
    controller,
    setChatInfo,
    setChatOrdersInfo,
    onSizeChangedCallback,
    type SizeChangedOption,
    type EChatroomSize
  } from '$src/containers/Chatroom'

  import { getUser, type IUser } from './utils'

  import type { ISportMarketSummary } from '$containers/BetDetail/types'

  const isWindow: boolean = true
  let expandType: `${EChatroomSize}` = 'default'
  let dom: HTMLDivElement
  let changedHeight: number
  let videoPlay: boolean = false
  let isTransition: boolean = false
  let sportMarketSummary: ISportMarketSummary
  let selfOrdersCallback: () => Promise<any>
  let followOrdersCallback: (data) => Promise<any>

  let user: IUser = { account: '', token: '' }

  $: initHeight = dom?.getBoundingClientRect().height

  $: changedHeight = initHeight

  $: if (dom) {
    controller.setChatEnv({
      device: 'wap',
      subscribeBindingChatroom: true
    })

    setUserAuth({
      userAccount: user.account,
      userToken: user.token,
    })

    setUserInfo({
      userVip: 10,
      userCurrency: 'CNY'
    })

    setChatInfo({
      displayType: isWindow ? 'window' : 'block',
      useScrollCollapse: true,
      chatId: '9434287',
      height: initHeight,
      // iid: 9433737,
      showBetEnable: true,
      expandAnimation: true,
      size: 'default'
    })
  }

  $: setChatInfo({ height: changedHeight, size: expandType })
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

  setGoDeposit(() => { console.log('⛔️⛔️⛔️⛔️⛔️ GoDeposit called') })
  setGoVipCenter(() => { console.log('⛔️⛔️⛔️⛔️⛔️ GoVipCenter called') })
  setGoLogin(() => { console.log('⛔️⛔️⛔️⛔️⛔️ GoLogin called') })

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

  const followOrders = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
    console.log(data, '這裡是跟單資料')
  }

  onMount(async () => {
    user = await getUser()
    await fetchMarket()
    controller.active()
    selfOrdersCallback = fetchSelfOrders
    followOrdersCallback = followOrders

    // setTimeout(() => {
    //   controller.setChatUserInfo({
    //     userAccount: 'owen222',
    //     userToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiOTY0MmE1ZDEtNDMyMy00MWMzLWFkZmMtOTI1MTUzYTFhY2Q5IiwidmVuZG9ySWQiOjQsInR5cGUiOjEsInVzZXJJZCI6MzA3NzMyLCJsb2dpbkRvbWFpbiI6ImVuLXZkMDA0LXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg4NzE4NTA2MDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMzIyODQ3MDAwLCJ2ZW5kb3IiOiJkdjUiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJvd2VuMjIyIn0.QUDRQqq6JyNIhrqj2hkzto0BbzBiTZKpHdUzpHAZxTg',
    //     userVip: 0,
    //     userCurrency: 'CNY'
    //   })
    // }, 15 * 1000)
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
