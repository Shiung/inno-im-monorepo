<script lang="ts">
  import HeaderBg from './images/headerBg.png'
  import { t, locale } from '$stores'
  import { Win, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import DoubleArrow from '$containers/Chatroom/images/double_arrow_down_small.svg'
  export let message

  // const status = isMarketClosed ? 'disable' : 'active'
  const lang = ['zh_CN', 'zh_HK'].includes($locale) ? $locale : 'en_US'
  const src = new URL(`./images/show_${lang}.png`, import.meta.url).pathname
  const { marketType } = message
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
      amountSize={'22px'}
      textColor={'rgb(var(--im-monorepo-primary))'}
    />
    <Market betItem={message} />
    <BetOn betItem={message} />
    <Ante betItem={message} textColor={'#999'} />
  </div>
</div>
