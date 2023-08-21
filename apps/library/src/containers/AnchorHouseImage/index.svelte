<script lang="ts">
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import Loading from './Loading.svelte'

  export let src: string
  export let defaultSrc = ''

  let loading = true
  let containerWidth: number
  let imgHeight = 0

  const onError = () => {
    if (defaultSrc) src = defaultSrc
    loading = false
  }

  const onLoad = () => {
    loading = false
  }

  onMount(() => {
    const img = new Image()
    img.src = src
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)

    return () => {
      img.removeEventListener('load', onLoad)
      img.removeEventListener('error', onError)
    }
  })

  $: imgHeight = containerWidth * 9 / 16
</script>

<div bind:clientWidth={containerWidth}>
  {#if loading}
    <Loading {imgHeight} />
  {:else if src}
    <div
      data-cid="HouseImage"
      class={twMerge('block bg-no-repeat bg-center bg-cover h-0', $$props.class)}
      style:background-image={`url(${src})`}
      style:height={`${imgHeight}px`}
    />
  {:else}
    <div style:height={`${imgHeight}px`} />
  {/if}
</div>
