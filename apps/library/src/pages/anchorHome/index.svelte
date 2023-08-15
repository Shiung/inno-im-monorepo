<script lang="ts">
  import { im } from 'api'
  import type { IWebAnchor, IPager } from 'api/im/types'
  import type { ILanguages } from 'env-config'

  import Header from '$components/Header'
  import VIPNotification from '$containers/VIPNotification'

  import { locale, getUseLang } from '$stores'
  import { NO_LANG } from '$src/constant'
  import { fetchAnchorMatches } from '$pages/anchor/AnchorList/utils'

  import StreamBlock from './StreamBlock'
  import AnchorBlock from './AnchorBlock'
  import { setAnchorStore, initAnchorStore } from './store'
  import { isLg } from '$stores'

  let streaming: IWebAnchor

  let originData: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []
  let data: Awaited<ReturnType<typeof im.webAnchorsRecommend>>['data']['list'] = []

  let pageIdx = 1
  let pageSize = 50
  let hasMoreData = false
  let loading = false

  const { anchorMatches, anchorMatchLoadings } = setAnchorStore(initAnchorStore)

  $: useLang = $getUseLang()

  const fetchMatchesFromAnchors = async (list: typeof originData, lang: ILanguages) => {
    if (Object.keys($anchorMatches).length >= 5) return (loading = false)

    const { matchCount, houseId } = list[0] || {}
    if (matchCount > 0) {
      anchorMatchLoadings.update((prev) => ({ ...prev, [houseId]: true }))
      const [firstMatch] = await fetchAnchorMatches(houseId, lang)

      if (firstMatch) {
        anchorMatches.update((prev) => ({ ...prev, [houseId]: firstMatch }))
        anchorMatchLoadings.update((prev) => ({ ...prev, [houseId]: false }))

        if (!streaming) {
          streaming = list[0]
        } else {
          data.push(list[0])
        }
      }
    }

    list.shift()
    if (list.length) {
      fetchMatchesFromAnchors(list, lang)
    } else if (hasMoreData) {
      fetchAnchors(useLang)
    } else {
      loading = false
    }
  }

  const setHasMoreData = (pager?: IPager) => {
    if (!pager) return (hasMoreData = false)
    const { totalPage } = pager || {}
    hasMoreData = totalPage > pageIdx
    if (hasMoreData) pageIdx++
  }

  const fetchAnchors = async (lang: string) => {
    try {
      // 避免連發兩次
      if (loading) return

      loading = true

      const response = await im.webAnchors({
        query: {
          pageIdx,
          pageSize,
          lang,
          anchorType: 1
        },
        headers: { 'Accept-Language': lang }
      })

      const { list, pager } = response?.data || {}
      setHasMoreData(pager)

      if (list?.length) {
        fetchMatchesFromAnchors(list, $locale)
      } else {
        loading = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  $: if (useLang !== NO_LANG) {
    pageIdx = 1
    streaming = undefined
    data = []

    fetchAnchors(useLang)
  }
</script>

<VIPNotification />
<div>
  {#if !$isLg}
    <Header />
  {/if}

  <div class="space-y-[10px] lg:px-[20px]">
    <StreamBlock {streaming} {loading} />

    <AnchorBlock {data} {loading} />
  </div>
</div>
