<script lang="ts">
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'

  export let betItem
</script>

{#if betItem.cashOut}
  <div class={twMerge('text-[#999]', $$props.class)}>
    {$t('chat.cashOut')}
  </div>
{/if}
