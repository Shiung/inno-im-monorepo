<script lang='ts'>
import Empty from '$containers/Empty'

import { list } from './store'
import StreamingAnchor from './StreamingAnchor/index.svelte'
import Anchor from './Anchor/index.svelte'

let _list: string[] = []
list.list.subscribe((value) => _list = value)
</script>

{#if !_list || _list?.length === 0}
  <Empty class='bg-white h-[300px]'/>
{:else}
  <div>
    <StreamingAnchor />

    <div class='px-[12px] mt-[12px]'>
    {#each _list || [] as houseId}
      <Anchor houseId={houseId} />
    {/each}
    </div>
  </div>
{/if}

