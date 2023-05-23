<script lang="ts">
  import type { IArticleDetail } from 'api/im/types'
  import { twMerge } from 'tailwind-merge';
  import { beImgUrlParse, ImageType } from 'utils/imgUrlParse'
  import { t } from '$src/stores';
  import { marketTypeDispatcher, type TResolver } from '$src/utils/match'

  import { Badget } from 'ui';
  import TeamLogo from '$src/components/TeamLogo'

  import { getIsPast } from '../../context'  

  type TeamType = 'home' | 'away'
  export let data: IArticleDetail
  export let type: TeamType

  $: kColor = type === 'home' ? '#80B100' : '#CB0202'

  $: dispatcher = marketTypeDispatcher(data?.marketType)

  const getKAndOdds: TResolver<[IArticleDetail, TeamType], { k: string, odd: string }> = {
    ml(data, type) {
      if (type === 'home') return { k: data?.homeName, odd: data?.odds?.[0]?.h }
      return { k: data?.awayName, odd: data?.odds?.[0]?.a }
    },
    ah(data, type) {
      if (type === 'home') return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.h }
      return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.a }
    },
    ou(data, type) {
      if (type === 'home') return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.ov }
      return { k: data?.odds?.[0]?.k, odd: data?.odds?.[0]?.ud }
    },
  }
  const getMatchResult: TResolver<[IArticleDetail, TeamType], boolean> = {
    ml(data, type) {
      if (type === 'home') return data?.matchResult === 'h'
      return data?.matchResult === 'a'
    },
    ah(data, type) {
      if (type === 'home') return data?.matchResult === 'h'
      return data?.matchResult === 'a'
    },
    ou(data, type) {
      if (type === 'home') return data?.matchResult === 'ov'
      return data?.matchResult === 'ud'
    }
  }

  $: info = {
    name: type === 'home' ? data?.homeName : data?.awayName,
    id: type === 'home' ? data?.homeId : data?.awayId,
    ...dispatcher(getKAndOdds, data, type)
  }
  
  $: active = dispatcher(getMatchResult, data, type)

  const { isPast } = getIsPast()
</script>

<div
  class={twMerge(
    'flex flex-col items-center bg-white w-full shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] rounded-[10px] py-2',
    active ? 'relative border border-[rgba(var(--im-monorepo-primary))]' : '',
    $$props.class
  )}
>
  {#if active}
    <div class='absolute -top-[1px] -left-[1px]'>
      <Badget variant='gradientPrimary'> { $t('common.recommend') } </Badget>
    </div>
  {/if}
  <div class="text-center">
    <TeamLogo class='w-[30px] h-[30px]' src={beImgUrlParse({ id: info.id, type: ImageType.competitors })}/>
    <span class='text-[12px] leading-[18px]'> {info.name} </span>
  </div>

  <div class='text-[15px] leading-[23px] text-center space-x-2 mt-1'>
    {#if !$isPast}
      <span style:color={kColor}> {info.k} </span>
      <span class='font-semibold'> {info.odd} </span>
    {/if}
  </div>
</div>