<script lang='ts'>
import { slide } from 'svelte/transition'
import { params } from 'svelte-spa-router'
import { im } from 'api'
import { t } from '$stores'

import { Button } from 'ui'

import SubMenu from '$src/components/SubMenu/index.svelte'
import Empty from '$containers/Empty'
import Expert, { Loading as ExpertLoading } from '$containers/Expert'

import { locale } from '$stores'
import type { ILanguages } from 'env-config'

import { convertSid, type SidType } from 'utils'
import type { IExpertMenu } from '$src/components/SubMenu/type'

let active: IExpertMenu['type'] = 0
const menu: IExpertMenu[] = [
  { 
    i18n: 'expert.hit',
    type: 0,
    onClick: () => console.log('expert.hit') 
  },
  {
    i18n: 'expert.winningStreakKing',
    type: 1,
    onClick: () => console.log('expert.winningStreakKing') 
  },
  // TODO
  // {
  //   i18n: 'expert.followUp',
  //   type: 2,
  //   onClick: () => console.log('expert.followUp')
  // },
]

let predictionsPromise: ReturnType<typeof im.expertPredictions>
const fetchPredictions = (sid: SidType, type: typeof active, lang: ILanguages) => {
  if (sid === null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      ...(type && { type }),
      pageIdx: 1,
      pageSize: 10
    },
    headers: { 'Accept-Language': lang }
  })
}

let showMore: boolean = false

$: sid = convertSid($params?.sid)
$: fetchPredictions(sid, active, $locale)

</script>

<div data-cid='ExpertBlock' class='bg-white rounded-[20px]'>
  <SubMenu class='border-b divide-solid' menu={menu} bind:active={active} />

  {#await predictionsPromise}
    <ExpertLoading length={3} />
  {:then predictions}
    {@const list = predictions?.data?.list || []}

    <div class='pl-[14px] pr-[20px] py-[20px] space-y-10'>
      {#if list.length === 0}
        <Empty class='h-[300px]' />
      {:else}
        {#each list.slice(0, 3) as prediction}
          <Expert prediction={prediction} /> 
        {/each}
        
        {#if showMore}
          {#each list.slice(3) as prediction}
            <div transition:slide>
              <Expert prediction={prediction} /> 
            </div>
          {/each}

        {:else}
          {#if list.length > 3}
            <Button class='h-[56px] rounded-[12px] w-full text-[16px]' on:click={() => showMore = true}>
              {$t('common.openMore')}
            </Button>
          {/if}

        {/if}

      {/if}
    </div>
  {/await}
</div>
