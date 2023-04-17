<script context='module' lang='ts' >
import { writable } from 'svelte/store'
export const num = writable<number>(0)

</script>

<script lang='ts'>
// import { params } from 'svelte-spa-router'
// import { convertSid } from 'utils'

import ExpertList from '$containers/ExpertList'

// $: sid = convertSid($params?.sid)
</script>

<div>
  {$num}
</div>
<ExpertList />
