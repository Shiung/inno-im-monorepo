<script lang="ts">
  import { onMount } from 'svelte'
  import { t, locale } from '$stores'
  import { Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'

  import HeaderBg from './images/headerBg.png'
  import DoubleArrow from '$containers/Chatroom/images/double_arrow_down_small.svg'

  export let message
  export let self: boolean = false

  let src: string

  const { marketType } = message

  const type = self ? 'show' : 'follow'
  const lang = ['zh_CN', 'zh_HK'].includes($locale) ? $locale : 'en_US'
  // const status = isMarketClosed ? 'disable' : 'active'
  const status = 'active'

  const fetchImg = async () => {
    const loader = () => import(`./images/${type}_${lang}_${status}.png`)
    const img = await loader()
    return img.default
  }

  onMount(async () => {
    src = await fetchImg()
  })
</script>

<div class="w-[270px] text-[12px] im-shadow">
  <div
    class="relative h-[30px] flex justify-center items-center"
    style:background-image={`url(${HeaderBg})`}
  >
    <div class="flex pb-[5px]">
      <img class="h-[14px]" {src} alt="" />
      <div class="rotate-[270deg] ml-[2px]">
        <DoubleArrow width={12} height={12} fill="rgb(var(--im-monorepo-primary))" />
      </div>
    </div>
    <div class="absolute w-full px-[5px] top-[10px] flex justify-between text-[#999]">
      <span>{marketType && $t(`chat.marketType_${marketType}`)}</span>
      <Date class="text-right" betItem={message} />
    </div>
  </div>

  <div class="flex flex-col justify-center items-center space-y-[4px] pb-[8px]">
    <Win
      class="mt-[15px] mb-[8px] leading-[20px] text-[rgb(var(--im-monorepo-primary))]"
      betItem={message}
      chatMessage
    />
    <Market betItem={message} />
    <BetOn betItem={message} />
    <Ante betItem={message} color={'#999'} />
  </div>
</div>
