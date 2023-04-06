<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { twMerge } from 'tailwind-merge'
const dispatch = createEventDispatcher()

import { createRipple } from '../utils'

export let ripple: boolean | string = false
export let variant: keyof typeof $$props.variants = 'primary'
export let disabled: boolean = false

$: _variant = $$props.variants && $$props.variants[variant]

const handleClick = (e: any) => {
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

  <slot></slot>
</button>
