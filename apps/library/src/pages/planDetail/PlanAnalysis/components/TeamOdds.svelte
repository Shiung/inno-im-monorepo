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
  export let isLocked: boolean

  $: dispatcher = marketTypeDispatcher(data?.marketType)

  const getKAndOdds: TResolver<[IArticleDetail, TeamType], { k: string, odd: string }> = {
    ml(data, type) {
      if (type === 'home') return { k: '', odd: data?.odds?.[0]?.h }
      return { k: '', odd: data?.odds?.[0]?.a }
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
  const getMarketType: TResolver<[], string> = {
    ml: () => 'ml',
    ah: () => 'ah',
    ou: () => 'ou',
  }

  $: info = {
    name: type === 'home' ? data?.homeName : data?.awayName,
    id: type === 'home' ? data?.homeId : data?.awayId,
    ...dispatcher(getKAndOdds, data, type)
  }
  
  $: active = !isLocked && dispatcher(getMatchResult, data, type)

  $: isOU = dispatcher(getMarketType) === 'ou'

  const { isPast } = getIsPast()
</script>

<div
  data-cid='TeamOdds'
  class={twMerge(
    'flex flex-col items-center bg-white w-full im-shadow rounded-[10px] py-2',
    active ? 'relative border border-[rgba(var(--im-monorepo-primary))]' : '',
    $$props.class
  )}
>
  {#if active}
    <Badget class='absolute -top-[1px] -left-[1px]'> { $t('common.recommend') } </Badget>
  {/if}
  <div class="text-center">
    {#if !isOU}
      <TeamLogo class='w-[30px] h-[30px]' src={beImgUrlParse({ id: info.id, type: ImageType.competitors })}/>
      <span class='text-[12px] leading-[18px]'> {info.name} </span>
    {:else}
      <span class='text-[12px] leading-[18px]'> {type === 'home' ? $t('common.over') : $t('common.under')} </span>
    {/if}
  </div>

  <div class='text-[15px] leading-[23px] text-center space-x-2 mt-1'>
    {#if !$isPast}
      {#if info.k}
        <span style:color={type === 'home' ? '#80B100' : '#CB0202'}> {info.k} </span>
      {/if}
      {#if info.odd}
        <span class='font-semibold'> {info.odd} </span>
      {/if}
    {/if}
  </div>
</div>