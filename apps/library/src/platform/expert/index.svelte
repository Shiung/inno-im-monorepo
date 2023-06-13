<script lang='ts' context='module'>
import { writable } from 'svelte/store';
import { initGoToDetail } from '$src/containers/ExpertList'
let sid = writable(null)
export const setSid = (sidValue: number) => {
  if (typeof sidValue !== 'number') return console.warn('setSid parameter MUST be type of number')

  sid.set(sidValue)
}

let goToDetail = writable(initGoToDetail)
export const setGoToExpertDetail = (callback: (path: string) => void) => goToDetail.update(e => {
  e.goToExpertDetailCallback = callback
  return e
})
export const setGoToPlanDetail = (callback: (path: string) => void) => goToDetail.update(e => {
  e.goToPlanDetailCallback = callback
  return e
})

</script>

<script lang='ts'>
import { im } from 'api'
import { locale } from '$stores'
import type { ILanguages } from 'env-config'

import ExpertList, { Loading } from '$containers/ExpertList'
import Empty from '$src/containers/Empty'

let predictionsPromise: ReturnType<typeof im.expertPredictions>

const fetchPredictions = (sid: number, lang: ILanguages) => {
  if (sid == null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      type: 0,
      pageIdx: 1,
      pageSize: 10
    },
    headers: { 'Accept-Language': lang }
  })
}

$: fetchPredictions($sid, $locale)

</script>

{#await predictionsPromise}
  <Loading />
{:then response}
  <div class='bg-white'>
    <ExpertList list={response?.data?.list || []} goToDetail={$goToDetail} />
  </div>
{:catch}
  <Empty class='h-[300px]' />
{/await}
