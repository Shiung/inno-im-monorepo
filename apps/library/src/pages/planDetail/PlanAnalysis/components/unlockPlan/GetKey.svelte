<script lang="ts">
  import { t } from '$stores'

  import { Button } from 'ui'

  export let handleFetchUserKeyInfo: () => void
</script>

<Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => {}}>
  {$t('user.vipCenterGetKey')}
</Button>
