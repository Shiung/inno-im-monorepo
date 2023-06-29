<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  export let currency: string
  const src = new URL(`./images/${currency}.png`, import.meta.url).pathname
</script>

<img class={twMerge($$props.class)} {src} alt="" />
