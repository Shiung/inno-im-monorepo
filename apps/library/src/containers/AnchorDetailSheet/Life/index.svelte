<script lang='ts'>
import { timestampToFormat } from 'utils/convertDateAndTimestamp'
import { t } from '$stores'
import Loading from './Loading.svelte'
import Empty from '$containers/Empty'

import type { IWebAnchorLife } from 'api/im/types'

export let life: { loading: boolean, data: IWebAnchorLife['res']['data'] }

type IStories = {
  [year: string]: Array<typeof life.data.list[number] & { day: string, time: string }>
}

const parseLifeData = (list?: typeof life.data.list) => {
  const stories: IStories = {}

  list.sort((a, b) => b.date - a.date)

  for (const item of list) {
    const datetime = timestampToFormat({ ts: item.date, format: 'YYYY MM-DD hh:mm' })
    const [year, day, time] = datetime.split(' ')
    
    const story = { ...item, day, time }
    if (stories[year]) stories[year].push(story)
    else stories[year] = [story]
  }

  return Object.entries(stories)
}

</script>

<div class='px-[16px]'>
  {#if life.loading}
    <Loading />
  {:else}
    {@const list = life?.data?.list || []}
      {#if list.length === 0}
        <Empty class='h-[200px]'/>
      {:else}
        {#each parseLifeData(list) as [year, stories]}
          <div class='font-semibold text-[18px]'> {$t('common.year', { num: year })} </div>

          <div class='space-y-[20px] my-[16px]'>
            {#each stories as story}
              <div class='grid grid-cols-[45px_80px_auto] gap-[15px]'>
                <div>
                  <div class='text-[14px]'> {story.day} </div>
                  <div class='text-[10px] text-[#999999]'> {story.time} </div>
                </div>
                <img class='w-[80px] h-[80px]' src={story.image} alt='' />
                <div class='text-[12px] h-full break-all'> {story.context} </div>
              </div>
            {/each}
          </div>

        {/each}
      {/if}
  {/if}
</div>
