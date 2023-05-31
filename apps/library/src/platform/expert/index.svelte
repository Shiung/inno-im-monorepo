<script lang='ts' context='module'>
import { writable } from 'svelte/store';
import { initGoDetail } from '$src/containers/ExpertList'
let sid = writable(null)
export const setSid = (sidValue: number) => {
  if (typeof sidValue !== 'number') return console.warn('setSid parameter MUST be type of number')

  sid.set(sidValue)
}

let goDetail = writable(initGoDetail)
export const setGoToExpertDetail = (callback: (path: string) => void) => goDetail.update(e => {
  e.goExpertDetailCallback = callback
  return e
})
export const setGoToPlanDetail = (callback: (path: string) => void) => goDetail.update(e => {
  e.goPlanDetailCallback = callback
  return e
})

</script>

<script lang='ts'>
import { im } from 'api'

import ExpertList, { Loading } from '$containers/ExpertList'
import Empty from '$src/containers/Empty'

let predictionsPromise: ReturnType<typeof im.expertPredictions>

const fetchPredictions = (sid: number) => {
  if (sid == null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      type: 0,
      pageIdx: 1,
      pageSize: 10
  }})
}

$: fetchPredictions($sid)

</script>

{#await predictionsPromise}
  <Loading />
{:then response}
  <ExpertList list={response?.data?.list || []} goMethods={$goDetail} />
{:catch}
  <Empty />
{/await}
