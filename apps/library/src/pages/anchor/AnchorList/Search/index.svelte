<script lang='ts'>
import { Search } from 'ui'
import { t } from '$stores'

let dict: string[] = []
let value: string

</script>

<Search class='mb-[10px] text-[11px]' dict={dict} bind:value={value} on:select={(e) => console.log(e.detail)} 
  on:clear
  placeholder={$t('anchor.search.placeholder')}
/>


