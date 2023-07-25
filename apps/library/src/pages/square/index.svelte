<script lang="ts">
  import { im } from 'api'
  import type { IWebAnchor } from 'api/im/types'

  import { locale, getUseLang } from '$stores'

  import Header from '$components/Header'
  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'

  import { NO_LANG } from '$src/constant'

  import { AbortControllers } from 'utils'

  let streaming: IWebAnchor

  let data: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []
  let loading: boolean = false
  const abortControllers = new AbortControllers()

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
  }

  const fetchAnchors = async () => {
    streaming = undefined
    data = []

    abortControllers.abortControllers('fetch-anchors')
    const controller = {
      ctl: new AbortController(),
      isAborted: false,
      key: 'fetch-anchors'
    }
    abortControllers.addController(controller)

    try {
      loading = true
      const response = await im.webAnchorsRecommend(
        {
          query: { lang: useLang },
          headers: { 'Accept-Language': $locale }
        },
        { signal: controller.ctl.signal }
      )

      const { list } = response?.data || {}
      if (list?.length) {
        streaming = list[0]
        data = list.slice(1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (!controller.isAborted) loading = false

      abortControllers.spliceController(controller)
    }
  }

  $: useLang = $getUseLang()

  $: if (useLang !== NO_LANG) fetchAnchors()

</script>

<div>
  <Header />

  <div class="space-y-[10px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {data} {loading} on:change={onChange} />
    <!-- {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if} -->
  </div>
</div>
