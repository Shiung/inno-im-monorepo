<script lang='ts'>
import { Badget } from 'ui'
import { t } from '$stores'

import Hot from './images/icon_hot_w.svg'

export let streak: number

</script>

{#if streak < 2}
  <div />
{:else if streak >= 2 && streak < 5}
  <Badget variant='hot'> {$t('export.winningStreak', {num: streak})} </Badget>
{:else if streak >= 5 && streak < 9}
  <Badget variant='mega'> {$t('export.winningStreak', {num: streak})} </Badget>
{:else if streak >= 10}
  <Badget class='inline-flex items-center' variant='crazy'>
    <Hot width={9} height={10} fill='#ffffff' />
    {$t('export.winningStreak', {num: streak})}
  </Badget>
{/if}

