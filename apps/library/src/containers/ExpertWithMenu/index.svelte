<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { im } from 'api'

import { locale } from '$stores'
import ExpertList, { Loading } from '$containers/ExpertList'

import Menu from './Menu/index.svelte'

import type { ILanguages } from 'env-config'
import type { IExpertMenu } from './types'
import type { SidType } from 'utils'

export let sid: SidType
export let folder: boolean = false

let actived: IExpertMenu['type'] = 0
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

const fetchPredictions = (sid: SidType, type: typeof actived, lang: ILanguages) => {
  if (sid === null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      ...(type && { type }),
      pageIdx: 1,
      pageSize: 10},
    headers: { 'Accept-Language': lang }
  })
}

$: fetchPredictions(sid, actived, $locale)

</script>


<div data-cid='ExpertWithMenu' class={twMerge('bg-white', $$props.class)}>
  <Menu class='border-b divide-solid' menu={menu} bind:actived={actived} />

  {#await predictionsPromise}
    <Loading />
  {:then predictions}
    <ExpertList list={predictions?.data?.list || []} folder={folder} /> 
  {/await}
</div>
