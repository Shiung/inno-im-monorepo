<script lang='ts'>
import { Button } from 'ui'
import { t } from '$stores'
import Loading from './Loading.svelte'
import Expert from './Expert/index.svelte'

import { fetchExpertPredictions } from '../../service'

const predictionsPromise = fetchExpertPredictions()
</script>

<div class='p-[20px] space-y-10'>
  {#await predictionsPromise}
    <Loading />
  {:then prodictions}

    {#each prodictions?.list as prodiction}
      <Expert prodiction={prodiction} /> 
    {/each}

    <Button class='h-[56px] rounded-[12px] w-full text-[16px]'>
      {$t('common.openMore')}
    </Button>

  {/await}


</div>
