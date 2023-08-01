<script lang="ts">
  import { im } from 'api'
  import { params } from 'svelte-spa-router'
  import type { IWebAnchor } from 'api/im/types'

  import VIPNotification from '$containers/VIPNotification'

  import { locale, getUseLang } from '$stores'

  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'

  import { NO_LANG } from '$src/constant'

  import { convertSid, AbortControllers } from 'utils'

  let streaming: IWebAnchor

  $: sid = convertSid($params?.sid)

  let data: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  let loading: boolean = false
  const abortControllers = new AbortControllers()

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
  }

  const fetchAnchors = async (sid: number) => {
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
      const response = await im.webAnchors(
        {
          query: { sid, lang: useLang, pageIdx: 1, pageSize: 4 },
          headers: { 'Accept-Language': $locale }
        },
        { signal: controller.ctl.signal }
      )

      const { list } = response?.data || {}
      if (list?.length) {
        data = list
        streaming = list[0]
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (!controller.isAborted) loading = false

      abortControllers.spliceController(controller)
    }
  }

  const init = (sid: number, lang: string) => {
    if (sid && sid !== 0 && lang !== NO_LANG) fetchAnchors(sid)
  }

  $: useLang = $getUseLang()

  $: init(sid, useLang)
</script>

<VIPNotification />
<div>
  <div class="space-y-[10px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {data} {loading} on:change={onChange} />

    {#if sid === 1 || sid === 2}
      <ExpertBlock />
    {/if}
  </div>
</div>
