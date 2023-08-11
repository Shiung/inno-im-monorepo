<script lang="ts">
  import { im } from 'api'
  import type { IPager, IWebAnchor, IWebAnchorMatch } from 'api/im/types'
  import { locale, getUseLang } from '$stores'

  import Empty from '$containers/Empty'
  import RetryInfiniteScroll from '$components/RetryInfiniteScroll'
  import AnchorCard from '$containers/AnchorCard'
  import { NO_LANG } from '$src/constant'

  let pageIdx = 1
  let pageSize = 6
  let hasMoreData: boolean = false
  let initLoading: boolean = false
  let data: IWebAnchor[] = []

  const fetchAnchors = async ({ sid, useLang }: { sid: number, useLang: string }) => {
    let ret: Awaited<ReturnType<typeof im.webAnchors>>['data']['list']

    const response = await im.webAnchors({
      query: {
        ...(sid && { sid }),
        pageIdx,
        pageSize,
        lang: useLang
      },
      headers: { 'Accept-Language': $locale }
    })

    const { list, pager } = response?.data || {}
    if (list?.length) ret = list

    setHasMoreData(pager)
    
    return ret
  }

  const setHasMoreData = (pager?: IPager) => {
    if (!pager) return (hasMoreData = false)
    const { totalPage } = pager || {}
    hasMoreData = totalPage > pageIdx
    if (hasMoreData) pageIdx++
  }

  const fetchInit = async (sid, lang) => {
    if (sid != null && lang !== NO_LANG) return
    pageIdx = 1
    data = []

    try {
      initLoading = true
      const resData = await fetchAnchors({ sid, useLang })
      if (resData?.length) {
        // data = filterAnchorsBySidAndMatchCount(resData)
        // fetchMatchesFromAnchors(data)
      }

    } catch (error) {
      console.error(error)
      setHasMoreData()
    } finally {
      initLoading = false
    }
  }

  $: sid = 1

  $: useLang = $getUseLang()

  $: fetchInit(sid, useLang)
</script>