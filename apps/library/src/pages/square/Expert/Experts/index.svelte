<script lang='ts'>
import { Button } from 'ui'
import { t } from '$stores'
</script>

<div class='p-[20px] space-y-[8px]'>

  {#each { length: 3 } as _}
    <div class='flex items-center justify-center h-[180px] animate-pulse bg-[#eeeeee]'>
      expert
    </div>
  {/each}

  <Button class='h-[56px] rounded-[12px] w-full text-[16px]'>
    {$t('common.openMore')}
  </Button>

</div>
