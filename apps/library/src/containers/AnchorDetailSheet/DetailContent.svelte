<script lang='ts'>
import { im } from 'api'
import { locale } from '$stores'

import type { IWebAnchorLife, IWebAnchorInfo, IWebAnchorMatch } from 'api/im/types'
import type { ITabs } from './types'
import { fetchAnchorMatches } from '$src/pages/anchor/AnchorList/utils'

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
  const res = await im.webAnchorLife({ query: { houseId, pageIdx: 1, pageSize: 10 }, headers: { 'Accept-Language': $locale } })
  life.data = res?.data
  life.loading = false
}

let personal: { loading: boolean, data: IWebAnchorInfo['res']['data'] } = { loading: true, data: undefined}
const fetchPersonal = async () => {
  if (personal.data) return
    
    personal.loading = true
    const res = await im.webAnchorInfo({ query: { houseId }, headers: { 'Accept-Language': $locale} })
    personal.data = res?.data
    personal.loading = false
}

let matches: { loading: boolean, data: IWebAnchorMatch[] } = { loading: true, data: [] }
const fetchMatches = async () => {
  matches.loading = true
  const data = await fetchAnchorMatches(houseId, $locale)
  matches.data = data
  matches.loading = false
}

const fetchDataByActiveTab = (tab: keyof typeof tabs) => {
  if (tab === 'anchor.matches') fetchMatches()
  else if (tab === 'anchor.life') fetchAnchorLife()
  else if (tab === 'anchor.personal') fetchPersonal()
}

$: fetchDataByActiveTab(activedTab)

</script>


{#await lazyLoading then comp}
  {#if activedTab === 'anchor.matches'}
    <svelte:component this={comp} data={matches.data} loading={matches.loading} />
  {:else if activedTab === 'anchor.personal'}
    <svelte:component this={comp} personal={personal} houseId={houseId} />
  {:else if activedTab === 'anchor.life'}
    <svelte:component this={comp} life={life} />
  {/if}
{/await}
