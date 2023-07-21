<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  export let variant: keyof typeof $$props.variants = 'primary'
  $: _variant = $$props.variants && $$props.variants[variant]
</script>

<svelte:component this={_variant?.component} class={twMerge(_variant?.className, $$props.class)} />
