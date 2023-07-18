<script lang='ts'>
  import { im } from 'api'
  import { params } from 'svelte-spa-router'
  import { createEventDispatcher } from 'svelte'
  import type { IWebAnchor } from 'api/im/types'

  import { locale } from '$stores'
  import convertSid from 'utils/convertSid'

  import Header from '$components/Header'
  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'

  let streaming: IWebAnchor
  let list: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  let loading: boolean = false

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
  }

  $: fetchAnchors(convertSid($params?.sid))

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
  <Header />

  <div class='space-y-[10px]'>
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {list} {loading} on:change={onChange} />
    <!-- {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if} -->
  </div>
</div>
