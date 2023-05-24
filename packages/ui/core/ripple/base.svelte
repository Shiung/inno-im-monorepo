<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import UAParser from 'ua-parser-js'
import { twMerge } from 'tailwind-merge'

import { createRipple } from '../utils/ripple'

const ua = new UAParser()
$: isMobile = ua.getDevice().type === 'mobile'

const dispatch = createEventDispatcher()

export let ripple: boolean | string = null
export let variant: keyof typeof $$props.variants = 'primary'
export let disabled: boolean = false
export let dom: HTMLButtonElement

$: _variant = $$props.variants && $$props.variants[variant]

const handleClick = (e: any) => {
  const _ripple = ripple || _variant?.ripple
  if (ripple !== false && _ripple) createRipple(e, _ripple)
  dispatch('click')
}


</script>

<button {...$$restProps} {disabled}
  class={twMerge(
    'relative overflow-hidden',
    disabled && 'cursor-auto',
    isMobile && 'cursor-auto',
    _variant?.className, $$props.class
  )}
  on:click|preventDefault|stopPropagation={handleClick}
  bind:this={dom}
>

  <slot></slot>
</button>
