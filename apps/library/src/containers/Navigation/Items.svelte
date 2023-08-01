<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'
</script>

<Ripple class={twMerge($$props.class)} on:click>
  <slot />
</Ripple>
