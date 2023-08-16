<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Ripple } from 'ui'
  import { t } from '$stores'
  import Circle from 'ui/core/button/loading.svelte'

  export let loading: boolean

  const dispatch = createEventDispatcher()
</script>

<div class='w-full flex justify-center'>
  <Ripple class="flex items-center justify-center cursor-pointer" on:click={() => dispatch('fetchMore')}>
    <div class="flex items-center justify-center bg-[rgba(76,158,234,0.05)] rounded-[10px] h-[34px] px-[16px]">
      {#if loading}
        <div class='text-[12px] text-imprimary'> {$t('chat.loading')} </div>
        <div class='relative w-[16px] h-[16px] ml-[8px]'>
          <Circle stroke='rgb(var(--im-monorepo-primary))' />
        </div>
      {:else}
        <div class="text-[12px] text-imprimary">{$t('chat.clickToMore')}</div>
      {/if}
    </div>
  </Ripple>
</div>