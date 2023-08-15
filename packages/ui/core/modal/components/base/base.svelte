<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { createEventDispatcher } from 'svelte'
  import { scale } from 'svelte/transition'
  import { backOut } from 'svelte/easing'

  import { portal, dismiss } from '../../directive'
  export let variant: keyof typeof $$props.variants = 'primary'
  $: _variant = $$props.variants && $$props.variants[variant]

  const dispatch = createEventDispatcher()

  export let show: boolean = false
  export let shake: boolean = false
  export let closeOnDismiss: boolean = false

  export const handleDismiss = (node: Element) => {
    if (closeOnDismiss) show = false
    dispatch('dismiss', node)
  }

  const recoverShake = () => setTimeout(() => (shake = false), 300)

  $: if (shake) recoverShake()
</script>

<div data-cid='Modal' hidden>
  {#if show}
    <div
      use:portal
      use:dismiss
      on:dismiss={handleDismiss}
      in:scale={{ duration: 200, easing: backOut }}
      out:scale={{ duration: 200 }}
      class={twMerge(_variant?.className, $$props.class, shake && 'shake')}
    >
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  @keyframes shake {
    0% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  .shake {
    animation-name: shake;
    animation-duration: 0.1s;
    animation-iteration-count: 2;
  }
</style>
