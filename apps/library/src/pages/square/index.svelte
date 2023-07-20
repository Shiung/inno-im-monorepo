<script lang="ts">
  import { im } from 'api'
  import { params } from 'svelte-spa-router'
  import type { IWebAnchor } from 'api/im/types'

  import { locale } from '$stores'
  import convertSid from 'utils/convertSid'

  import Header from '$components/Header'
  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'

  let streaming: IWebAnchor
  let list: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []
  let loading: boolean = false

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
  }

  const fetchAnchors = async (sid: number) => {
    if (!sid || sid === 0) return

    loading = true
    const response = await im.webAnchorsRecommend({
      headers: { 'Accept-Language': $locale }
    })
    loading = false

    if(response?.data?.list.length) {
      streaming = response.data.list[0]
      list = response.data.list.slice(1)
    }
  }

  $: fetchAnchors(convertSid($params?.sid))
</script>

<div>
  <Header />

  <div class="space-y-[10px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {list} {loading} on:change={onChange} />
    <!-- {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if} -->
  </div>
</div>
