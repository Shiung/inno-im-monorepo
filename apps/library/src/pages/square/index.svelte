<script lang='ts'>
import FlvPlayer, { onError, onReady } from 'ui/components/FlvPlayer'
import { params, replace } from 'svelte-spa-router'
import type { IWebAnchor } from 'api/im/types'
import Circle from 'ui/core/button/loading.svelte'

import HeaderNavigation from '$containers/HeaderNavigation'
import HouseImage from '$src/components/HouseImage/index.svelte'

import AnchorBlock from './AnchorBlock'
import ExpertBlock from './ExpertBlock'

import { convertSid, type SidType } from 'utils'

$: sid = convertSid($params?.sid)
let streaming
let loading = false
let error = false

const headNavIcons: { sid: SidType, onClick: () => void }[] = [
  {
    sid: 1,
    onClick: () => replace('/square/1')
  },
  {
    sid: 2,
    onClick: () => replace('/square/2')
  },
  {
    sid: 3,
    onClick: () => replace('/square/3')
  }
]

const onChange = (e: CustomEvent<IWebAnchor>) => {
  streaming = e.detail
}

onError((e) => {
  loading = false
  error = true
})

onReady(() => {
  loading = false
})

$: if(streaming) { error = false }
$: if(streaming && streaming?.liveStatus === 2) loading = true
</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />

  <div class='space-y-[10px]'>
    {#if streaming}
      {#if streaming?.liveStatus === 2}
        <!-- {#if !error} -->
        <div class='relative min-h-[200px]'>
          {#if loading}
            <div class='absolute inset-0 bg-white flex items-center justify-center'>
              <div class='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] overflow-hidden' >
                <Circle stroke='rgb(var(--im-monorepo-primary))' />
              </div>
            </div>
          {/if}

          <FlvPlayer url={streaming?.playStreamAddress} />
        </div>
        <!-- {/if} -->
      {:else}
        <HouseImage src={streaming?.houseImage} />
      {/if}
    {/if}

    <AnchorBlock on:change={onChange} />
    {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if}
  </div>
</div>
