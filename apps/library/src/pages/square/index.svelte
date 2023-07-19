<script lang="ts">
  import { params, replace } from 'svelte-spa-router'
  import type { IWebAnchor } from 'api/im/types'

  import HeaderNavigation from '$containers/HeaderNavigation'

  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'

  import { convertSid, type SidType } from 'utils'

  let streaming: IWebAnchor

  $: sid = convertSid($params?.sid)

  const headNavIcons: { sid: SidType; onClick: () => void }[] = [
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
</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />

  <div class="space-y-[10px]">
    <StreamBlock {streaming} />

    <AnchorBlock on:change={onChange} />
    <!-- {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if} -->
  </div>
</div>
