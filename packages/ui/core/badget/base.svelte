<script lang='ts'>
import { twMerge } from 'tailwind-merge'
export let variant: keyof typeof $$props.variants = 'primary'
export let background: string

$: _variant = $$props.variants && $$props.variants[variant]
$: _background = _variant?.background

</script>

<div {...$$restProps}
  class={twMerge(
    _variant?.className, $$props.class
  )}
  style:background={background || _background}
>
  <slot />
</div>
