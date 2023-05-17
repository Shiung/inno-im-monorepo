<script lang="ts">
  import type { IArticleDetail } from 'api/im/types'
  import { twMerge } from 'tailwind-merge';
  import { beImgUrlParse, ImageType } from 'utils/imgUrlParse'

  import TeamLogo from '$src/components/TeamLogo'

  export let data: IArticleDetail
  export let type: 'home' | 'away'

  $: kColor = type === 'home' ? '#80B100' : '#CB0202'

  $: info = {
    name: type === 'home' ? data.homeName : data.awayName,
    id: type === 'home' ? data.homeId : data.awayId,
    ...getOddAndK()
  }

  const getOddAndK = (): { k: string; odd: string } => {
    function _mlAndAhResult() {
      if (type === 'home') return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.h }
      else return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.a }
    }
    function _ouResult() {
      if (type === 'home') return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.ov }
      else return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.ud }
    }

    switch (data.marketType) {
      case '11':
      case '12':
      case '21':
      case '22':
        return _mlAndAhResult()
      case '13':
      case '23':
        return _ouResult()
    }
  }
</script>

<div class={twMerge('flex flex-col items-center bg-white w-full shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] rounded-[10px] py-2', $$props.class)}>
  <div class="text-center">
    <TeamLogo class='w-[30px] h-[30px]' src={beImgUrlParse({ id: info.id, type: ImageType.competitors })}/>
    <span class='text-[12px] leading-[18px]'> {info.name} </span>
  </div>

  <div class='text-[15px] leading-[23px] text-center space-x-2 mt-1'>
    <span style:color={kColor}> {info.k} </span>
    <span class='font-semibold'> {info.odd} </span>
  </div>
</div>