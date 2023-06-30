<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  export let currency: string

  let src: string

  const fetchAvatar = async () => {
    const loader = () => import(`./images/${currency}.png`)
    const comp = await loader()
    return comp.default
  }

  onMount(async () => {
    src = await fetchAvatar()
  })
</script>

<img class={twMerge($$props.class)} {src} alt="" />
