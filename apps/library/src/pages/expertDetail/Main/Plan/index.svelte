<script lang='ts'>
import { params } from 'svelte-spa-router'
// import { im } from 'api'

import Ongoing from './Ongoing/index.svelte'
console.log('plan component')

</script>

<div data-cid='expertDetail_Main_Plan' class='mx-[16px]'>
  <Ongoing expertId={$params.expertId} />
</div>
