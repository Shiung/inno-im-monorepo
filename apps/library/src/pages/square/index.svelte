<script lang="ts">
  import { im } from 'api'
  import type { IWebAnchor } from 'api/im/types'
  import { AbortControllers } from 'utils'
  import type { ILanguages } from 'env-config'

  import Header from '$components/Header'  
  import VIPNotification from '$containers/VIPNotification'

  import { locale, getUseLang } from '$stores'
  import { NO_LANG, SID } from '$src/constant'
  import { fetchAnchorMatches } from '$src/pages/anchor/AnchorList/utils'

  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import ExpertBlock from './ExpertBlock'
  import { setSquareStore, initSquareStore } from './store'

  let streaming: IWebAnchor

  let originData: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []
  let data: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []
  let loading: boolean = false

  const { anchorMatches, anchorMatchLoadings } = setSquareStore(initSquareStore)
  const abortControllers = new AbortControllers()

  const onChange = (e: CustomEvent<IWebAnchor>) => {
    streaming = e.detail
    data = originData.filter(anchor => anchor !== e.detail)
  }

  const fetchMatchesFromAnchors = async (data: typeof originData, lang: ILanguages) => {
    data.forEach(async (anchor) => {
      if (!anchor?.houseId || anchor?.sid === SID.deposit) {
        anchorMatchLoadings.update((prev) => ({ ...prev, [anchor.houseId]: false }))
        return
      }
      anchorMatchLoadings.update((prev) => ({ ...prev, [anchor.houseId]: true }))
      const [firstMatch] = await fetchAnchorMatches(anchor.houseId, lang)
      anchorMatches.update((prev) => ({ ...prev, [anchor.houseId]: firstMatch }))
      anchorMatchLoadings.update((prev) => ({ ...prev, [anchor.houseId]: false }))
    })
  }

  const fetchAnchors = async (lang: ILanguages) => {
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
          headers: { 'Accept-Language': lang }
        },
        { signal: controller.ctl.signal }
      )

      const { list } = response?.data || {}
      if (list?.length) {
        originData = list
        streaming = list[0]
        data = list.slice(1)

        fetchMatchesFromAnchors(originData, $locale)
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (!controller.isAborted) loading = false

      abortControllers.spliceController(controller)
    }
  }

  $: useLang = $getUseLang()

  $: if (useLang !== NO_LANG) fetchAnchors($locale)

</script>

<VIPNotification />
<div>
  <Header />

  <div class="space-y-[10px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {data} {loading} on:change={onChange} />

    <ExpertBlock />
  </div>
</div>
