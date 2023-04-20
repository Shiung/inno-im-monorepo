<script lang='ts'>
import Loading from './Loading.svelte'

import type { IWebAnchorLife } from 'api/im/types'

export let life: { loading: boolean, data: IWebAnchorLife }
</script>

<div class='px-[16px] space-y-[20px]'>
  {#if life.loading}
    <Loading />
  {:else}
    {#each life?.data?.lifeStory as story}

    <div class='grid grid-cols-[45px_80px_auto] gap-[15px] h-[80px] overflow-y-hidden'>
      <div class='text-[14px]'> {story.date} </div>
      <img class='w-[80px] h-[80px]' src={story.image} alt='' />
      <div class='text-[12px] h-full'>
        <div> {story.context} </div>
      </div>
    </div>

    {/each}
  {/if}
</div>
