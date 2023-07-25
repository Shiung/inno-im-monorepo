<script lang="ts">
  import { t } from '$stores'

  import { Button } from 'ui'
  import { goVipCenterCallback } from '$stores'

</script>

<Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => $goVipCenterCallback()}>
  {$t('user.vipCenterGetKey')}
</Button>
