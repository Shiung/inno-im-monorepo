<script lang='ts'>
import { params } from 'svelte-spa-router'
// import { im } from 'api'

import Ongoing from './Ongoing/index.svelte'
import History from './History/index.svelte'
console.log('plan component')

</script>

<div data-cid='expertDetail_Main_Plan space-y-[25px]' class='mx-[16px]'>
  <Ongoing expertId={$params.expertId} />
  <History expertId={$params.expertId} />
</div>
