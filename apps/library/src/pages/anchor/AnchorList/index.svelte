<script lang="ts">
  import { im } from 'api'
  import type { IPager, IWebAnchor, IWebAnchorMatch } from 'api/im/types'
  import { convertSid, AbortControllers } from 'utils'
  import { locale, getUseLang } from '$stores'
  import { params } from 'svelte-spa-router'

  import RetryInfiniteScroll from '$components/RetryInfiniteScroll'

  import Empty from '$src/containers/Empty'
  import { NO_LANG, SID } from '$src/constant'

  import Loading from './Loading.svelte'
  import Anchor from './Anchor/index.svelte'
  import Search from './Search/index.svelte'

  import { fetchAnchorMatches } from './utils'

  let keyWord = ''

  let pageIdx = 1
  let pageSize = 20

  let initLoading: boolean = false
  let data: IWebAnchor[] = []
  let hasMoreData: boolean = false

  const matchesMap: { [k: string]: { data: IWebAnchorMatch, loading: boolean } } = {}

  const abortControllers = new AbortControllers()

  const fetchAnchors = async ({ sid, keyWord, useLang }: { sid: ReturnType<typeof convertSid>, keyWord: string, useLang: string }) => {
    let ret: Awaited<ReturnType<typeof im.webAnchors>>['data']['list']

    const response = await im.webAnchors({
      query: {
        ...(sid && { sid }),
        ...(keyWord && { keyWord }),
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

  const fetchMatchesByAnchor = async (houseId: IWebAnchor['houseId']) => {
    try {
      if (!matchesMap[houseId]) matchesMap[houseId] = { loading: false, data: null }
      
      matchesMap[houseId].loading = true
      const [first] = await fetchAnchorMatches(houseId, $locale)
      if (first) matchesMap[houseId].data = first
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    } finally {
      matchesMap[houseId].loading = false
    }
  }

  const fetchMatchesFromAnchors = async (data: IWebAnchor[]) => {
    return await Promise.allSettled(
      data.reduce((filtered, item) => {
        if (item.sid === SID.deposit) return filtered
        return [...filtered, fetchMatchesByAnchor(item.houseId)]
      }, [])
    ).then(() => filterAnchorsBySidAndHasMatch(data))
  }

  const loadAnchors = async () => {
    try {
      const resData = await fetchAnchors({ sid, keyWord, useLang })
      if (resData?.length) {
        const filteredResData = filterAnchorsBySidAndMatchCount(resData)
        data = [...data, ...filteredResData]
        await fetchMatchesFromAnchors(filteredResData)
      }

    } catch (error) {
      console.error(error)
      setHasMoreData()
    }
  }
  // TODO: 待後端與三方 api 調整後移除，後端會只給 matchCount > 0 的賽事主播
  const filterAnchorsBySidAndMatchCount = (data: IWebAnchor[]) => {
    return data.filter(item => item.sid === SID.deposit || item.matchCount)
  }

  const filterAnchorsBySidAndHasMatch = (data: IWebAnchor[]) => {
    data.filter(item => item.sid === SID.deposit || matchesMap[item.houseId].data )
  }

  const setHasMoreData = (pager?: IPager) => {
    if (!pager) return (hasMoreData = false)
    const { totalPage } = pager || {}
    hasMoreData = totalPage > pageIdx
    if (hasMoreData) pageIdx++
  }

  const fetchInit = async () => {
    pageIdx = 1
    data = []

    abortControllers.abortControllers('fetch-im.webAnchors')
    const controller = {
      ctl: new AbortController(),
      isAborted: false,
      key: 'fetch-im.webAnchors'
    }
    abortControllers.addController(controller)

    try {
      initLoading = true
      const resData = await fetchAnchors({ sid, keyWord, useLang })
      if (resData?.length) {
        data = filterAnchorsBySidAndMatchCount(resData)
        fetchMatchesFromAnchors(data)
      }

    } catch (error) {
      console.error(error)
      setHasMoreData()
    } finally {
      if (!controller.isAborted) initLoading = false

      abortControllers.spliceController(controller)
    }
  }

  const init = (sid, lang) => {
    if (sid != null && lang !== NO_LANG) {
      document.body.scrollTo(0, 0)
      window.scrollTo(0, 0)

      fetchInit()
    }
  }

  $: sid = convertSid($params?.anchorSid)

  $: useLang = $getUseLang()

  $: init(sid, useLang)
</script>

<div data-cid="Anchor_AnchorList" class="bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]">
  <Search bind:value={keyWord} on:searchEvent={() => init(sid, useLang)} />

  <div class="space-y-[12px]">
    {#if initLoading}
      <Loading />
    {:else if !data?.length}
      <Empty class="h-[calc(100vh_-_170px)]" />
    {:else}
      <RetryInfiniteScroll hasMore={hasMoreData} load={() => loadAnchors()}>
        <div class='grid grid-cols-2 gap-3'>
          {#each data || [] as anchor}
            <Anchor
              class='items-stretch'
              {anchor}
              matchInfo={matchesMap[anchor?.houseId]}
            />
          {/each}
        </div>
      </RetryInfiniteScroll>
    {/if}
  </div>
</div>
