<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { locale } from '$stores'

  export let betItem

  const isShow = betItem?.details[0].settle !== 0 || betItem.cashOut

  const lang = ['zh_CN', 'zh_HK'].includes($locale) ? $locale : 'en_US'

  const checkType = (netWin: number) => {
    switch (Math.sign(netWin)) {
      case 1:
        return 'win'
      case -1:
        return 'lose'
      case 0:
        return 'draw'
    }
  }

  const fetchSvg = async () => {
    const type = checkType(betItem.netWin)
    const loader = () => import(`./images/resultIcon/${type}_${lang}.svg`)
    const img = await loader()

    return img.default
  }
</script>

{#if isShow}
  <div class={twMerge('right-[-10px] bottom-[5px] w-[60px]', $$props.class, 'absolute z-0')}>
    {#await fetchSvg() then SVG}
      <svelte:component this={SVG} />
    {/await}
  </div>
{/if}
