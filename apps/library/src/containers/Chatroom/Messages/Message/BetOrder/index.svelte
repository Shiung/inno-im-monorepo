<script lang="ts">
  import { onMount } from 'svelte'
  import { t, locale } from '$stores'
  import { Win, ResultIcon, Market, BetOn, Ante, Date } from '$containers/BetDetail'
  import { getOrdersInfo } from '$containers/Chatroom/context'
  import { twMerge } from 'tailwind-merge'

  import HeaderBg from './images/headerBg.png'
  import DoubleArrow from '$containers/Chatroom/images/double_arrow_down_small.svg'
  import type { ShowType, ActiveType, ILanguages } from './types'
  import { ShowConf, ActiveConf } from './types'

  import Loading from 'ui/core/button/loading.svelte'
  import { getConfig } from 'env-config'
  import { getVendorTheme } from 'utils'
  
  export let message
  export let self: boolean = false

  const { followOrdersCallback } = getOrdersInfo()

  let src: string
  let isProcess: boolean = false

  const { marketType } = message

  let type: ShowType = self ? ShowConf.show : ShowConf.follow
  let lang: ILanguages = ['zh_CN', 'zh_HK'].includes($locale) ? $locale : 'en_US'
  let status: ActiveType = self ? ActiveConf.disable : ActiveConf.active
  // const status = isMarketClosed ? 'disable' : 'active'

  const getBetOrderAction = async (_type: string, _lang: string, _status: string) => {
    const vendor = getVendorTheme(getConfig()?.VENDERID || 'vd004')
    const image = await import(`./images/vendors/${vendor}/${_type}_${_lang}_${_status}.png`)
    return image
  }

  const fetchImg = async (_type: string, _lang: string, _status: string) => {
    const img = await getBetOrderAction(_type, _lang, _status)
    return img.default
  }

  $: (async () => {src = await fetchImg(type, lang, status)})()
  
  $: isDisable = isProcess || status === ActiveConf.disable

  const clickHandler = async () => {
    if (self || isProcess) return
    if (typeof $followOrdersCallback !== 'function') return console.warn('followOrdersCallback callback MUST be function')
    isProcess = true
    await $followOrdersCallback(message)
    isProcess = false
  }

  onMount(async () => {
    src = await fetchImg(type, lang, status)
  })
</script>

<div class="w-[270px] text-[12px] im-shadow overflow-hidden">
  <div
    on:click={clickHandler} on:keypress
    class={twMerge("relative h-[30px] flex justify-center items-center", isDisable && 'pointer-events-none')}
    style:background-image={`url(${HeaderBg})`}
  >
    {#if isProcess}
      <Loading stroke='#999' />
    {:else}
      <div class="flex pb-[5px]">
        <img class="h-[14px]" {src} alt="" />
        <div class="rotate-[270deg] ml-[2px]">
          <DoubleArrow width={12} height={12} fill={isDisable ? '#999' : 'rgb(var(--im-monorepo-primary))'} />
        </div>
      </div>
    {/if}
    <div class="absolute w-full px-[5px] top-[10px] flex justify-between text-[#999]">
      <span>{marketType && $t(`chat.marketType_${marketType}`)}</span>
      <Date class="text-right" betItem={message} />
    </div>
  </div>

  <div class="relative flex flex-col justify-center items-center space-y-[4px] pb-[8px]">
    <Win
      class="mt-[15px] mb-[8px] leading-[20px] text-[rgb(var(--im-monorepo-primary))]"
      betItem={message}
      chatMessage
    />
    <ResultIcon betItem={message} />
    <Market betItem={message} />
    <BetOn betItem={message} />
    <Ante betItem={message} color={'#999'} />
  </div>
</div>
