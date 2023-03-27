<script lang='ts'>
import { languages } from 'env-config'
import { Button } from 'ui'

import { locale, t } from '$stores'

</script>

<div class='mb-[20px]'> {`language: ${$locale}`} </div>

{#each languages as lang}
  <Button class='w-[88px] mr-2 mb-2' on:click={() => locale.set(lang)}> {lang} </Button>
{/each}
  
<div> {$t('matches.switch.auto')} </div>
<div> {$t('matches/monitor.account')} </div>


