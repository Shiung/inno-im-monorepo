<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { getInfo } from '$containers/Chatroom/context'
  import { CurrencyMap } from '../constant'
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'

  export let selected: boolean
  export let self: boolean

  const dispatch = createEventDispatcher()
  const { userCurrency } = getInfo()

  $: transl = self ? 'chat.betList' : 'chat.follow'

  $: ({ minBet, displayName } = CurrencyMap[$userCurrency])
</script>

<div
  class="flex justify-between items-center h-[83px] text-[12px] shadow-[0_0_6px_0_rgba(0,0,0,.1)] pl-[20px] pr-[16px]"
>
  <div>{$t('chat.greaterThanBets', { currency: displayName, minBet })}</div>
  <div
    class={twMerge(
      'rounded-[22px] px-[16px] bg-[#ddd] text-white leading-[30px]',
      selected ? 'bg-[rgb(var(--im-monorepo-primary))]' : ''
    )}
    on:click={() => dispatch('click')}
    on:keypress
  >
    {$t(transl)}
  </div>
</div>
