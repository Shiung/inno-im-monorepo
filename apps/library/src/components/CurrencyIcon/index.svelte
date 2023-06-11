<script lang="ts">
  export let currency: string
  export let size: string
  const src = new URL(`./images/${currency}.png`, import.meta.url).pathname
</script>

<img class={`w-[${size}] h-[${size}]`} {src} alt="" />
