<script lang="ts">
  import { t } from '$stores'
  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'
  import { showErrorMsgModal } from '$stores'

  const closeModal = () => {
    showErrorMsgModal.set(false)
  }
</script>

<div>
  <Modal bind:show={$showErrorMsgModal}>
    <Mark variant="info" />
    <Header variant="mark" class="py-4">{$t('errorCodeMsg.serverError')}</Header>
    <Button class="h-[44px] w-full text-base rounded-xl" on:click={closeModal}>{$t('common.confirm')}</Button>
  </Modal>
</div>