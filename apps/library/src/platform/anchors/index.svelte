<script lang='ts' context='module'>
import { list } from '../store'

import type { IPlatformAnchor } from './types'

import { filterListByLang } from '$stores'

export const setList = list.set
export const updateList = list.update
let onChangeCallback = (_anchor: IPlatformAnchor) => {}

export let onChange = (callback: typeof onChangeCallback) => {
  onChangeCallback = callback  
}

export const getFilterAnchorsByLang = filterListByLang.subscribe
</script>

<script lang='ts'>
import Empty from '$containers/Empty'

import StreamingAnchor from './StreamingAnchor/index.svelte'
import Anchor from './Anchor/index.svelte'

let _list: string[] = []
list.list.subscribe((value) => _list = value)

</script>

{#if !_list || _list?.length === 0}
  <Empty class='h-[300px]' />
{:else}
  <div>
    <StreamingAnchor />

    <div class='px-[12px] mt-[12px]'>
    {#each _list || [] as houseId}
      <Anchor houseId={houseId} on:change={(e) => onChangeCallback(e.detail)} />
    {/each}
    </div>
  </div>
{/if}

