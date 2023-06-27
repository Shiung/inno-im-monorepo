<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { onMount } from 'svelte'
import { locale } from '$stores'
import Chatroom, {
  setChatEnv,
  setChatInfo,
  setChatUserInfo,
  setChatOrdersInfo,
  onSizeChangedCallback,
  onToggledCallback ,
  type SizeChangedOption
} from '$src/containers/Chatroom'

const isWindow: boolean = true
let expandType: string = 'default'
let dom: HTMLDivElement
let changedHeight
let videoPlay: boolean = false
let isTransition: boolean = false
let sportMarketSummary

$: initHeight = dom?.getBoundingClientRect().height

$: changedHeight = initHeight

$: if (dom) {
  setChatEnv({
    displayType: isWindow ? 'window' : 'block',
    height: initHeight,
    showBetList: false,
    device: 'pc',
    isOpen: false
  })

  setChatInfo({
    chatId: '1234',
    iid: 123456,
    vipLimit: 0,
    frequency: 0,
  })

  setChatUserInfo({
    userAccount: 'sean001',
    userToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiZmM4NzU3MWYtNDQzZS00MDI0LWE1NGMtZjEyNTkwMWY3Y2E5IiwidmVuZG9ySWQiOjEsInR5cGUiOjEsInVzZXJJZCI6MzA3Njg3LCJsb2dpbkRvbWFpbiI6ImVuLXZkMDAxLXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg3NzUyNzMyMDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMTU0MDk2MDAwLCJ2ZW5kb3IiOiJkdjIiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJibHRlc3QwMSJ9.T4wC3cLQP1QtQOUKs8pX7sFd0TxAd7VzBep9_dLzFfk',
    userVip: 999
  })
}

$: setChatEnv({ height: changedHeight, size: expandType as any })
$: setChatOrdersInfo({sportMarketSummary})

onSizeChangedCallback((option: SizeChangedOption) => {
  isTransition = option.transition

  switch(option.size) {
    case 'default':
      expandType = 'default'
      break
    case 'normal':
      expandType = 'normal'
      changedHeight = initHeight
      break
    case 'expand':
      if(videoPlay) return
      expandType = 'expand'
      changedHeight = 0
      break
  }
})

onToggledCallback((open) => {
  setChatEnv({ isOpen: open })
})

// setTimeout(() => {
//   videoPlay = true
// }, 3000)
onMount(async ()=> {
  const fetchMarket = async () => {
    const lang = $locale.toLowerCase().replace(/_/g, '-')
    const res = await fetch(
      `https://tiger-api.innodev.site/platform/systatus/proxy/sports/dev/Java/json/${lang}/market_property_setting`
    ).then((res) => res.json())
    return res
  }
  sportMarketSummary = await fetchMarket()
})
</script>

<div>
  <div
    class={twMerge(
      'w-full bg-white h-[200px] duration-300',
      (expandType !== 'default') && 'fixed z-30',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    bind:this={dom}
    style:height={expandType !== 'default' ? `${changedHeight}px` : ''}
    style:overflow={!isWindow ? 'hidden' : ''}
  >
    this platform area
  </div>
  <div
    class={twMerge(
      'duration-300',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    style:height={(expandType !== 'default') ? `${changedHeight}px` : ''}
  />

  <div
    class={twMerge(
      'h-[2000px] bg-red-500',
      (expandType !== 'default') ? 'fixed left-0 right-0' : 'static'
    )}
  />
</div>

<Chatroom />
