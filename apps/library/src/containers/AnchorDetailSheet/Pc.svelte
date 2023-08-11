<script lang="ts">
  import Modal from 'ui/components/Modal'

  import { im } from 'api'
  import { Ripple } from 'ui'
  import { locale } from '$stores'

  import DetailHeader from './DetailHeader.svelte'
  import DetailContent from './DetailContent.svelte'

  import Loading from './Loading.svelte'
  import Close from './images/close.svg'

  import type { ITabs } from './types'

  export let open: boolean
  export let houseId: string

  const tabs: ITabs = {
    'anchor.matches': () => import('$containers/AnchorMatches'),
    'anchor.personal': () => import('./Personal/index.svelte'),
    'anchor.life': () => import('./Life/index.svelte')
  }

  let activedTab: keyof typeof tabs = 'anchor.matches'

  let detailPromise: ReturnType<typeof im.webAnchorDetail>
  $: if (open)
    detailPromise = im.webAnchorDetail({
      query: { houseId },
      headers: { 'Accept-Language': $locale }
    })

  const closeModal = () => (open = false)
</script>

<Modal class="px-0 py-[20px] w-[517px] h-[682px]" on:dismiss={closeModal} bind:show={open}>
  <div class="w-full flex justify-between px-[15px]">
    <div />
    <Ripple on:click={closeModal}>
      <Close width={20} height={20} fill="#666666" />
    </Ripple>
  </div>

  {#await detailPromise}
    <Loading />
  {:then detail}
    <DetailHeader detail={detail.data} bind:activedTab tabs={Object.keys(tabs)} />

    <div class="overflow-y-scroll w-full px-2">
      <DetailContent {activedTab} {tabs} {houseId} />
    </div>
  {/await}
</Modal>
