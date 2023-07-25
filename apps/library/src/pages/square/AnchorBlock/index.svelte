<script lang="ts">
  import { im } from 'api'
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'
  import { push, params } from 'svelte-spa-router'
  import { createEventDispatcher } from 'svelte'
  import type { IWebAnchor } from 'api/im/types'

  import { t, locale, getUseLang } from '$stores'
  import Empty from '$containers/Empty'
  import { convertSid, AbortControllers } from 'utils'

  import Anchor from './Anchor'
  import Loading from './Loading.svelte'
  import Arrow from './images/arrow_right_small.svg'

  let data: Awaited<ReturnType<typeof im.webAnchors>>['data']['list'] = []
  const abortControllers = new AbortControllers()
  let loading: boolean = false

  const fetchAnchors = async (sid: number) => {
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
      if (list?.length) data = list
    } catch (error) {
      console.error(error)
    } finally {
      if (!controller.isAborted) loading = false

      abortControllers.spliceController(controller)
    }
  }

  const init = (sid: string, ...rest) => {
    if (sid && sid !== '0') fetchAnchors(convertSid(sid))
  }

  $: useLang = $getUseLang()

  $: init($params?.sid, useLang)

  const dispatch = createEventDispatcher()

  const onAnchorClick = (anchor: IWebAnchor) => {
    dispatch('change', anchor)
  }
</script>

<div data-cid="AnchorList" class={twMerge('bg-white rounded-[20px] pt-[16px]', $$props.class)}>
  <div class="px-[16px] flex items-center justify-between">
    <div class="text-[18px] font-semibold">{$t('anchor.finding')}</div>

    <Ripple class="flex items-center space-x-[6px] text-[14px] pl-2 rounded-full" on:click={() => push(`/anchor/${$params.sid}`)}>
      <span> {$t('anchor.all')} </span>
      <Arrow width={12} height={12} fill="#333333" />
    </Ripple>
  </div>

  {#if loading}
    <Loading />
  {:else if data.length === 0}
    <Empty class="h-[320px]" />
  {:else}
    <div class='grid grid-cols-2 grid-rows-[1fr_1fr] gap-[12px] p-[16px]'>
      {#each data || [] as anchor}
        <Anchor {anchor} on:click={() => onAnchorClick(anchor)} />
      {/each}
    </div>
  {/if}
</div>
