<script lang='ts'>
import type { IWebAnchorDetail } from 'api/im/types'
import { Content } from 'ui/components/BottomSheet'

// TODO svlete component as props 的 type 用法
export let tabs: {[key: string]: () => Promise<any> }
export let activedTab: keyof typeof tabs
export let detail: IWebAnchorDetail


const loadingComponent = async (_activeTab: typeof activedTab) => {
  if (!activedTab) return
  const loader = tabs[activedTab]
  const comp = await loader()
  return comp.default
}

$: lazyLoading = loadingComponent(activedTab)
</script>


{#await lazyLoading then comp}
  <svelte:component this={comp} houseId={detail.houseId} detail={detail} />
{/await}
