<script lang="ts">
  import { t } from '$stores'

  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  let show = false
</script>

<div>
  <Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => (show = true)}>
    {$t('user.upgradeVipGetKey')}
  </Button>
</div>
