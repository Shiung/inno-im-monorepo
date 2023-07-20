<script lang="ts">
  import { im } from 'api'
  import { params, replace } from 'svelte-spa-router'
  import type { IWebAnchor } from 'api/im/types'

  import HeaderNavigation from '$containers/HeaderNavigation'

  import { locale } from '$stores'

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
  let list: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  let loading: boolean = false

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
  }

  $: fetchAnchors(sid)

  const fetchAnchors = async (sid: number) => {
    if (!sid || sid === 0) return

    loading = true
    const response = await im.webAnchors({
      query: { sid, pageIdx: 1, pageSize: 4 },
      headers: { 'Accept-Language': $locale }
    })
    loading = false

    if(response?.data?.list.length) {
      list = response.data.list

      streaming = list[0]
    }
  }

</script>

<div>
  <HeaderNavigation active={sid} icons={headNavIcons} />

  <div class="space-y-[10px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {list} {loading} on:change={onChange} />

    {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if}
  </div>
</div>
