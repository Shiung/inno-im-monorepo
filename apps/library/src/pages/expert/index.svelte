<script lang='ts'>
import { params, replace } from 'svelte-spa-router'
import { im } from 'api'

import HeaderNavigation from '$containers/HeaderNavigation'
import SubMenu from '$components/SubMenu/index.svelte'
import Empty from '$containers/Empty'
import Expert, { Loading as ExpertLoading } from '$containers/Expert'

import { convertSid, type SidType } from 'utils'
import type { IExpertMenu } from '$components/SubMenu/type'

const headNavIcons: {sid: SidType, onClick: () => void}[] = [
  {
    sid: 0,
    onClick: () => replace('/expert/0')
  },
  {
    sid: 1,
    onClick: () => replace('/expert/1')
  },
  {
    sid: 2,
    onClick: () => replace('/expert/2')
  }
]

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
const fetchPredictions = (sid: SidType, type: typeof active) => {
  if (sid === null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      ...(type && { type }),
      pageIdx: 1,
      pageSize: 10
  }})
}

$: sid = convertSid($params?.expertSid)
$: fetchPredictions(sid, active)

</script>

<div data-cid='Expert'>
  <HeaderNavigation active={sid} icons={headNavIcons} />
  
  <div class='bg-white'>
    <SubMenu class='border-b divide-solid' menu={menu} bind:active={active} />
  
    {#await predictionsPromise}
      <ExpertLoading length={5} />
    {:then predictions}
      {@const list = predictions?.data?.list || []}

      <div class='pl-[14px] pr-[20px] py-[20px] space-y-10'>
        {#if list.length === 0}
          <Empty class='h-[300px]'/>
        {:else}
          {#each list as prediction}
            <Expert prediction={prediction} /> 
          {/each}

        {/if}
      </div>
    {/await}
  </div>
</div>

