<script lang='ts'>
import Ongoing from './Ongoing/index.svelte'
import History from './History/index.svelte'
import { locale } from '$stores'
setTimeout(() => {
  locale.set('en_US')
}, 3000)
</script>

<div data-cid='expertDetail_Main_Plan' class='space-y-[25px] mx-[16px]'>
  {#key $locale}
    <Ongoing />
    <History />
  {/key}
</div>
