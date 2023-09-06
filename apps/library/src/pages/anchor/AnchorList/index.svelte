<script lang="ts">
  import type { IPager, IWebAnchor } from 'api/im/types'
  import { convertSid, AbortControllers } from 'utils'
  import { getUseLang, isLg, t, isXl } from '$stores'
  import { params } from 'svelte-spa-router'

  import RetryInfiniteScroll from '$components/RetryInfiniteScroll'

  import Empty from '$src/containers/Empty'
  import { NO_LANG } from '$src/constant'

  import Loading from './Loading.svelte'
  import Anchor from './Anchor/index.svelte'
  import Search from './Search/index.svelte'

  import { fetchAnchorsApi, filterAnchorList } from './utils'
  import BackBar from '$containers/BackBar'

  let keyWord = ''
  let pageIdx = 1
  // TODO: changed by device
  $: ANCHOR_MIN_COUNT = $isXl ? 15 : $isLg ? 12 : 8
  $: pageSize = 50

  let initLoading: boolean = false
  let data: IWebAnchor[] = []
  let hasMoreData: boolean = false

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

  const loadAnchors = async () => {
    try {
      const resData = await fetchAnchors({ sid, keyWord, useLang })
      if (resData?.length) {
        const filteredResData = filterAnchorList(resData)
        data = [...data, ...filteredResData]
      }
    } catch (error) {
      console.error(error)
      setHasMoreData()
    }
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
        data = filterAnchorList(resData)

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
              <Anchor class="items-stretch" {anchor} matchInfo={{ data: anchor?.matchList[0] }} />
            {/each}
          </div>
        </RetryInfiniteScroll>
      {/if}
    </div>
  </div>
</div>
