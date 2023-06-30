<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  export let currency: string

  let src: string

  const fetchImg = async () => {
    const loader = () => import(`./images/${currency}.png`)
    const img = await loader()
    return img.default
  }

  onMount(async () => {
    src = await fetchImg()
  })
</script>

<img class={twMerge($$props.class)} {src} alt="" />
