<script lang="ts">
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge'
  
  import Loading from './Loading.svelte'

  import { imgHeight } from './config'

  export let src: string
  export let defaultSrc: string = ''
  let loading = true

  const onError = () => {
    if(defaultSrc) src = defaultSrc
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
  })
</script>

{#if loading}
  <Loading />
{:else if src}
  <div
    data-cid='HouseImage'
    class={twMerge('block bg-no-repeat bg-cover h-0', $$props.class)}
    style:background-image={`url(${src})`}
    style:height={imgHeight}
  ></div>
{:else}
  <div style:height={imgHeight}></div>
{/if}