<script lang='ts'>
import { im } from 'api'

import type { IWebAnchorLife, IWebAnchorInfo } from 'api/im/types'
import type { ITabs } from './types'

export let tabs: ITabs
export let activedTab: keyof typeof tabs
export let houseId: string

const loadingComponent = async (_activeTab: typeof activedTab) => {
  if (!activedTab) return
  const loader = tabs[activedTab]
  const comp = await loader()
  return comp.default
}

$: lazyLoading = loadingComponent(activedTab)


let life: { loading: boolean, data: IWebAnchorLife['res']['data'] } = { loading: true, data: undefined }

const fetchAnchorLife = async () => {
  if (life.data) return

  life.loading = true
  const res = await im.webAnchorLife({ query: { houseId, pageIdx: 1, pageSize: 10 } })
  life.data = res?.data
  life.loading = false
}

let personal: { loading: boolean, data: IWebAnchorInfo['res']['data'] } = { loading: true, data: undefined}
const fetchPersonal = async () => {
  if (personal.data) return
    
    personal.loading = true
    const res = await im.webAnchorInfo({ query: { houseId }})
    personal.data = res?.data
    personal.loading = false
}

$: {
  if (activedTab === 'anchor.life') fetchAnchorLife()
  else if (activedTab === 'anchor.personal') fetchPersonal()
}


</script>


{#await lazyLoading then comp}
  {#if activedTab === 'anchor.matches'}
    <svelte:component this={comp} houseId={houseId} />
  {:else if activedTab === 'anchor.personal'}
    <svelte:component this={comp} personal={personal} houseId={houseId} />
  {:else if activedTab === 'anchor.life'}
    <svelte:component this={comp} life={life} />
  {/if}
{/await}
