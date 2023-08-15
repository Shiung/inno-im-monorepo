<script lang="ts" context="module">
  import { list, matchSid } from '../store'

  import type { IPlatformAnchor } from './types'

  import { filterListByLang } from '$stores'

  export const setList = list.set
  export const updateList = list.update
  let onChangeCallback = (_anchor: IPlatformAnchor) => {}

  export let onChange = (callback: typeof onChangeCallback) => {
    onChangeCallback = callback
  }

  let goAnchorListCallback: (path: string) => void = () => {}
  export let onAllAnchorsClick = (callback: typeof goAnchorListCallback) => {
    if (typeof callback !== 'function') return (console.warn('[setGoAnchorListCallback] callback must be function!'))
    goAnchorListCallback = callback
  }

  export const getFilterAnchorsByLang = filterListByLang.subscribe

  export const setMatchSid = matchSid.set
</script>

<script lang="ts">
  import Empty from '$containers/Empty'
  import { Ripple } from 'ui'

  import * as AnchorGroup from '$src/containers/AnchorGroup'
  import GroupContainer from './GroupContainer.svelte'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorLiveBadge from '$containers/AnchorLiveBadge'
  import { t } from '$stores'
  import Title from './Title.svelte'
  import { streaming } from '../store'
  import { StreamLiveStatus } from '$src/constant'
  import OtherAnchors from './OtherAnchors.svelte'
  import Arrow from '$src/pages/anchorHome/AnchorBlock/images/arrow_right_small.svg'

  const houseIdList = list.list
  let _list: string[] = []
  let noOtherAnchors: boolean = false
  houseIdList.subscribe((value) => {
    Array.isArray(value) && (_list = value)
  })

</script>

{#if !_list.length && noOtherAnchors}
  <Empty class='h-[300px]' />
{:else}
  <div data-cid="Platform_anchors" class='bg-white py-4 space-y-4'>
    {#if _list.length > 0}
      <Title titleKey={'anchor.currentMatchAnchors'} class='px-4' />
        
      <AnchorGroup.Container class='[&>:first-of-type]:ml-4 [&>:last-of-type]:!mr-4 py-4'>
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
    {/if}
    
    {#if !noOtherAnchors}
      <Title titleKey={'anchor.otherAnchors'} class='px-4'>
        <Ripple class="flex items-center space-x-[6px] text-[14px] pl-2 rounded-full" on:click={() => goAnchorListCallback('/anchorList')}>
          <span> {$t('anchor.all')} </span>
          <Arrow width={12} height={12} fill="#333333" />
        </Ripple>
      </Title>
    {/if}

    <OtherAnchors on:nodata={(e) => { noOtherAnchors = e.detail}} />
  </div>
{/if}
