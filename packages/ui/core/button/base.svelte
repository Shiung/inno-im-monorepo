<script lang='ts'>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

import { createRipple } from './utils'
import Loading from './loading.svelte'
import { twMerge } from 'tailwind-merge'

export let loading: boolean = false
export let ripple: boolean | string = false
export let variant: keyof typeof $$props.variants = 'primary'
export let disabled: boolean = false

$: _variant = $$props.variants && $$props.variants[variant]

const handleClick = (e: any) => {
  if (loading) return
  const _ripple = ripple || _variant.ripple
  if (_ripple) createRipple(e, _ripple)
  dispatch('click')
}


</script>

<button {...$$restProps} {disabled}
  class={twMerge(
    'relative overflow-hidden cursor-pointer',
    disabled && 'cursor-auto',
    _variant?.className, $$props.class
  )}
  on:click={handleClick}
>

  <span class={loading ? 'invisible' : ''}> <slot></slot> </span>
  {#if loading} <Loading /> {/if}

</button>


<style lang='scss'>
:global(.button__ripple) {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  opacity: 0.7;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
