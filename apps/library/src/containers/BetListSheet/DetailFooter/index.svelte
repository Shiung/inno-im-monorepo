<script lang="ts">
  import { Button } from 'ui'
  import { twMerge } from 'tailwind-merge'
  import { createEventDispatcher } from 'svelte'

  import { t, userInfo } from '$stores'
  import { CurrencyMap } from '../constant'

  export let selected: boolean
  export let self: boolean
  export let loading: boolean

  const dispatch = createEventDispatcher()

  const handleClick = () => {
    if (loading) return
    dispatch('click')
  }

  $: transl = self ? 'chat.betList' : 'chat.follow'

  $: ({ minBet, displayName } = CurrencyMap[$userInfo.userCurrency] || {})
</script>

<div class="flex justify-between items-center h-[83px] text-[12px] shadow-[0_0_6px_0_rgba(0,0,0,.1)] pl-[20px] pr-[16px]">
  <div>{$t('chat.greaterThanBets', { currency: displayName, minBet })}</div>
  <Button
    class={twMerge('rounded-[22px] px-[16px] bg-[#ddd] disabled:bg-[#ddd] text-white leading-[14px] hover:bg-[rgb(var(--im-monorepo-primary))]', selected ? 'bg-[rgb(var(--im-monorepo-primary))]' : '')}
    {loading}
    disabled={!selected || loading}
    on:click={handleClick}
    on:keypress
  >
    {$t(transl)}
  </Button>
</div>
