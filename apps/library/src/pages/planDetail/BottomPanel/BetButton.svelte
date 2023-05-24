<script lang="ts">
  import { Button } from 'ui'
  import { t } from '$stores'

  export let onButtonClick
</script>

<Button
  data-cid='BetButton'
  class='w-[283px] bg-[rgba(var(--im-monorepo-primary))] rounded-[12px] h-[56px]'
  on:click={onButtonClick}
>
  <span class='text-sm'> {$t('expert.planDetail.followBet')} </span>
</Button>