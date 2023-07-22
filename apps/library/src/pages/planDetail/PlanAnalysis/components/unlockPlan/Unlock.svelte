<script lang="ts">
  import { t } from '$stores'
  import { userKeyInfo } from '$stores/user'

  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  let show = false
</script>

<div>
  <Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => (show = true)}>
    {$t('expert.unlockPlan')}
  </Button>
  <Modal bind:show on:dismiss={(node) => console.log('modal outside clicked', node)}>
    <Mark variant="info" />
    <Header variant="mark" class="mb-3">{$t('common.prompt')}</Header>
    <p class="text-[rgb(var(--im-monorepo-primary))]">{$t('expert.keyDeduct')}</p>
    <p class="text-[rgb(var(--im-monorepo-primary))] mb-3">({`${$userKeyInfo.remainCount}/${$userKeyInfo.totalCount}`})</p>
    <div class="flex flex-col w-full">
      <Button class="h-[56px] mb-3" on:click={() => (show = false)}>{$t('common.confirm')}</Button>
      <Button class="h-[56px]" variant="outline" on:click={() => (show = false)}>{$t('common.cancel')}</Button>
    </div>
  </Modal>
</div>
