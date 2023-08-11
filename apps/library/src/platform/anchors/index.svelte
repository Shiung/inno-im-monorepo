<script lang="ts" context="module">
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

<script lang="ts">
  import Empty from '$containers/Empty'

  import * as AnchorGroup from '$src/containers/AnchorGroup'
  import GroupContainer from './GroupContainer.svelte'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'
  import Title from './Title.svelte'
  import { streaming } from '../store'
  import { StreamLiveStatus } from '$src/constant'

  const houseIdList = list.list
  let _list: string[] = []

  houseIdList.subscribe((value) => {
    _list = value
  })

</script>

{#if !_list || _list?.length === 0}
  <Empty class="h-[300px]" />
{:else}
  <div data-cid="Platform_anchors" class='space-y-3'>
    <div class="bg-white">
      <Title titleKey={'anchor.currentMatchAnchors'} />
      
      <AnchorGroup.Container class='p-[12px]'>
        {#each _list || [] as houseId}
          <GroupContainer {houseId} let:store={item} >
            <AnchorGroup.Unit active={houseId === $streaming?.houseId} on:click={() => onChangeCallback(item)}>
              <AnchorImage
                slot='image'
                src={item?.userImage}
                class='block w-[46px] h-auto rounded-full border-transparent bg-gradient-to-b from-[rgb(var(--im-monorepo-primary))] to-[rgb(var(--im-monorepo-secondary))]' />
              <svelte:fragment slot='username'>{item.nickName}</svelte:fragment>
              <svelte:fragment slot='flag'>
                {#if item?.liveStatus === StreamLiveStatus.LIVE}
                  <AnchorLiveBadge slot='flag' class='rounded-[4px]' />
                {/if}
              </svelte:fragment>
            </AnchorGroup.Unit>
          </GroupContainer>
        {/each}
      </AnchorGroup.Container>
    </div>

    <div class='bg-white'>
      <Title titleKey={'anchor.otherAnchors'} />

      
    </div>
  </div>
{/if}
