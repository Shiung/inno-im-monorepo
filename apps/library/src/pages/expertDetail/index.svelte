<script lang='ts'>
import BackBar from '$containers/BackBar'
import { t } from '$stores'
import { params } from 'svelte-spa-router'

import Info from './Info/index.svelte'

const Main = () => import('./Main/index.svelte')
const Ongoing = () => import('./Ongoing/index.svelte')

let promise: ReturnType<typeof Main | typeof Ongoing | null>

const fetchComponent = (params: Record<string, string>) => {
  if(!params) return promise = null
  if(params?.articleId) return promise = Ongoing()
  return promise = Main()
}

$: fetchComponent($params)
</script>

<div data-cid='expertDetail'>
  <BackBar title={$t('expert.detail')} />
  <Info />

  {#await promise then comp}
    <svelte:component this={comp?.default} />
  {/await}
</div>
