<script lang="ts">
  import { Ripple } from 'ui'
  import { twMerge } from 'tailwind-merge'
</script>

<Ripple data-id="Navigation__Items" class={twMerge($$props.class)} on:click>
  <slot />
</Ripple>
