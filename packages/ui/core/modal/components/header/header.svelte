<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  export let variant: keyof typeof $$props.variants = 'primary'
  $: _variant = $$props.variants && $$props.variants[variant]
</script>

<div class={twMerge(_variant?.className, $$props.class)}>
  <slot />
</div>
