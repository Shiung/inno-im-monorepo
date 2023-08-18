<script lang="ts">
  import type { IPager, IWebAnchor, IWebAnchorMatch } from 'api/im/types'
  import { convertSid, AbortControllers } from 'utils'
  import { locale, getUseLang, isLg, t, isXl } from '$stores'
  import { params } from 'svelte-spa-router'

  import RetryInfiniteScroll from '$components/RetryInfiniteScroll'

  import Empty from '$src/containers/Empty'
  import { NO_LANG } from '$src/constant'

  import Loading from './Loading.svelte'
  import Anchor from './Anchor/index.svelte'
  import Search from './Search/index.svelte'

  import { fetchAnchorsApi, fetchAnchorMatches, isDepositAnchor } from './utils'
  import BackBar from '$containers/BackBar'

  let keyWord = ''
  let pageIdx = 1
  // TODO: changed by device
  $: ANCHOR_MIN_COUNT = $isXl ? 15 : $isLg ? 12 : 8
  $: pageSize = 50

  let initLoading: boolean = false
  let data: IWebAnchor[] = []
  let hasMoreData: boolean = false

  const matchesMap: { [k: string]: { data: IWebAnchorMatch } } = {}

  const abortControllers = new AbortControllers()

  const fetchAnchors = async ({ sid, keyWord, useLang }: { sid: ReturnType<typeof convertSid>; keyWord: string; useLang: string }, options?: any) => {
    let ret: IWebAnchor[]

    const { list, pager } = await fetchAnchorsApi({
      sid,
      keyWord,
      lang: useLang,
      pageIdx,
      pageSize,
      // TODO: 等充提上線時需拔掉
      anchorType: 1
    }, options)

    if (list?.length) ret = list

    setHasMoreData(pager)

    return ret
  }

  const fetchMatchesByAnchor = async (houseId: IWebAnchor['houseId']) => {
    try {
      if (!matchesMap[houseId]) matchesMap[houseId] = { data: null }

      const [first] = await fetchAnchorMatches(houseId, $locale)
      if (first) matchesMap[houseId].data = first
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  const fetchMatchesFromAnchors = async (data: IWebAnchor[]) => {
    return await Promise.allSettled(
      data.reduce((filtered, item) => {
        if (isDepositAnchor(item)) return filtered
        return [...filtered, fetchMatchesByAnchor(item.houseId)]
      }, [])
    ).then(() => filterAnchorsBySidAndHasMatch(data))
  }

  const loadAnchors = async () => {
    try {
      const resData = await fetchAnchors({ sid, keyWord, useLang })
      if (resData?.length) {
        const filteredResData = await fetchMatchesFromAnchors(filterAnchorsBySidAndMatchCount(resData))
        data = [...data, ...filteredResData]
      }
    } catch (error) {
      console.error(error)
      setHasMoreData()
    }
  }

  const filterAnchorsBySidAndHasMatch = (data: IWebAnchor[]) => {
    return data.filter((item) => isDepositAnchor(item) || matchesMap[item.houseId].data)
  }

  // TODO: 待後端與三方 api 調整後移除，後端會只給 matchCount > 0 的賽事主播
  export const filterAnchorsBySidAndMatchCount = (data: IWebAnchor[]) => {
    return data.filter((item) => isDepositAnchor(item) || item.matchCount)
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
    hasMoreData = false

    abortControllers.abortControllers('fetch-im.webAnchors')
    const controller = {
      ctl: new AbortController(),
      isAborted: false,
      key: 'fetch-im.webAnchors'
    }
    abortControllers.addController(controller)

    try {
      initLoading = true
      const resData = await fetchAnchors({ sid, keyWord, useLang }, { signal: controller.ctl.signal })
      if (resData?.length) {
        data = await fetchMatchesFromAnchors(filterAnchorsBySidAndMatchCount(resData))

        while (data.length < ANCHOR_MIN_COUNT && hasMoreData) {
          await loadAnchors()
        }

      }
    } catch (error) {
      console.error(error)
      setHasMoreData()
    } finally {
      if (!controller.isAborted) initLoading = false

      abortControllers.spliceController(controller)
    }
  }

  const init = (lang) => {
    if (lang !== NO_LANG) {
      document.body.scrollTo(0, 0)
      window.scrollTo(0, 0)

      fetchInit()
    }
  }

  $: sid = convertSid($params?.anchorSid)

  $: useLang = $getUseLang()

  $: init(useLang)
</script>

<div data-cid="Anchor_AnchorList" class="lg:px-[20px] lg:py-[16px]">
  <BackBar title={$t('anchor.all')}>
    {#if $isLg}
      <Search bind:value={keyWord} on:searchEvent={() => init(useLang)} />
    {/if}
  </BackBar>

  <div class="bg-white rouned-[20px] pb-[8px] px-[16px] lg:p-[16px] lg:rounded-[10px]">
    {#if !$isLg}
      <Search bind:value={keyWord} on:searchEvent={() => init(useLang)} />
    {/if}

    <div class="py-3">
      {#if initLoading}
        <Loading size={ANCHOR_MIN_COUNT} />
      {:else if !data?.length}
        <Empty class="h-[calc(100vh_-_170px)]" />
      {:else}
        <RetryInfiniteScroll hasMore={hasMoreData} load={() => loadAnchors()}>
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {#each data || [] as anchor}
              <Anchor class="items-stretch" {anchor} matchInfo={matchesMap[anchor?.houseId]} />
            {/each}
          </div>
        </RetryInfiniteScroll>
      {/if}
    </div>
  </div>
</div>
