<script lang='ts'>
import { im } from 'api'

import Loading from './Loading.svelte'

import type { IWebAnchorDetail } from 'api/im/types'

export let houseId: string
export let detail: IWebAnchorDetail

const promise = im.webAnchorsLife({ query: { houseId } })

</script>

<div class='px-[16px] space-y-[20px]'>
  {#await promise}
    <Loading />
  {:then life }
    {#each life?.data?.lifeStory as story}

    <div class='grid grid-cols-[45px_80px_auto] gap-[15px] h-[80px] overflow-y-hidden'>
      <div class='text-[14px]'> {story.date} </div>
      <img class='w-[80px] h-[80px]' src={story.image} alt='' />
      <div class='text-[12px] h-full'>
        <div> {story.context} </div>
      </div>
    </div>

    {/each}
  {/await}
</div>
