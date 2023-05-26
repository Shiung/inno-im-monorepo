<script lang='ts' context='module'>
import { writable } from 'svelte/store';
import { convertSid } from 'utils'
import { initGoDetail, setGoDetail } from './context'

let sid = writable(null)
export const setSid = (setSid: string) => sid.set(convertSid(setSid))

let detail = writable(initGoDetail)
export const goToDetail = (callback: Function) => detail.update(e => {
  e.detailLocation = callback
  return e
})

</script>

<script lang='ts'>
import { im } from 'api'

import ExpertList, { Loading } from '$containers/ExpertList'

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
$: setGoDetail($detail)

</script>

{#await predictionsPromise}
  <Loading />
{:then response}
  <ExpertList list={response?.data?.list || []} />
{/await}
