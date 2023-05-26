<script lang='ts'>
import {num} from './store'
import { Button } from 'ui'
import { params } from 'svelte-spa-router'
import { convertSid } from 'utils'
import { im } from 'api'

import ExpertList, { Loading } from '$containers/ExpertList'

let predictionsPromise: ReturnType<typeof im.expertPredictions>

const fetchPredictions = (sid: number) => {
  if (sid === null) return
  predictionsPromise = im.expertPredictions({
    query: {
      ...(sid && { sid }),
      type: 0,
      pageIdx: 1,
      pageSize: 10
  }})
}

$: fetchPredictions(sid)

$: sid = convertSid($params?.sid)

</script>

<div>
  {$num}
</div>
<Button on:click={() => $num += 1}> plus </Button>
<Button on:click={() => $num -= 1}> minus </Button>

{#await predictionsPromise}
  <Loading />
{:then response}
  <ExpertList list={response?.data?.list || []} />
{/await}
