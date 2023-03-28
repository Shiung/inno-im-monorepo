<script lang='ts'>
import Fetch from './fetch.svelte'
import ChangeLocale from './changeLocale.svelte'
import Edit from '$assets/edit.svg'
import { t, locale } from '$stores'

let count = 0

const plus = () => {
  count += 1
}

</script>

<div class='text-sky-400'> this is a test svelte library </div>
<button on:click={plus}> plus </button>
<div> {count} </div>
<div> {$t('test.common.test2', {account: 'aaav'})} </div>
<div> {$locale} </div>

<Edit width={30} height={30} fill='#4c9eea' />


<Fetch />

<ChangeLocale />
