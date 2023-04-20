<script lang='ts'>
import { im } from 'api'

import type { IWebAnchorDetail, IWebAnchorLife } from 'api/im/types'
import type { ITabs } from './types'

export let tabs: ITabs
export let activedTab: keyof typeof tabs
export let detail: IWebAnchorDetail

const loadingComponent = async (_activeTab: typeof activedTab) => {
  if (!activedTab) return
  const loader = tabs[activedTab]
  const comp = await loader()
  return comp.default
}

$: lazyLoading = loadingComponent(activedTab)


let life: { loading: boolean, data: IWebAnchorLife } = { loading: true, data: undefined }

const fetchAnchorsLife = async () => {
  if (life.data) return

  life.loading = true
  const res = await im.webAnchorsLife({ query: { houseId: detail.houseId } })
  life.data = res?.data
  life.loading = false
}

$: if (activedTab === 'anchor.life') fetchAnchorsLife()

</script>


{#await lazyLoading then comp}
  {#if activedTab === 'anchor.matches'}
    <svelte:component this={comp} houseId={detail.houseId} />
  {:else if activedTab === 'anchor.personal'}
    <svelte:component this={comp} houseId={detail.houseId} detail={detail} />
  {:else if activedTab === 'anchor.life'}
    <svelte:component this={comp} life={life} />
  {/if}
{/await}
