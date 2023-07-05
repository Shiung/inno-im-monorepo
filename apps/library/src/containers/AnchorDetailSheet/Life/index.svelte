<script lang='ts'>
import { timestampToFormat } from 'utils/convertDateAndTimestamp'
import { t } from '$stores'
import Loading from './Loading.svelte'
import Empty from '$containers/Empty'
import { twMerge } from 'tailwind-merge'

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
              {@const { image, day, time, context } = story || {}}

              <div class={twMerge('grid gap-[15px]',
                image.length ? 'grid-cols-[45px_80px_auto]' : 'grid-cols-[45px_auto]'
              )}>
                <div>
                  <div class='text-[14px]'> {day} </div>
                  <div class='text-[10px] text-[#999999]'> {time} </div>
                </div>
                {#if image.length}
                  <img class='w-[80px] h-[80px]' src={image[0]} alt='' />
                {/if}
                <div class='text-[12px] h-full'> {context} </div>
              </div>
            {/each}
          </div>

        {/each}
      {/if}
  {/if}
</div>
