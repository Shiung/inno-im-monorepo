<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { twMerge } from 'tailwind-merge'
  
  import Loading from './Loading.svelte'

  import { imgHeightRatio } from './config'
  import { debounce } from 'utils'

  export let src: string
  export let defaultSrc: string = ''
  let loading = true
  let imgHeight: number = 0

  const onError = () => {
    if(defaultSrc) src = defaultSrc
    loading = false
  }

  const onLoad = () => {
    loading = false
  }

  const setRatioHeight = () => imgHeight = imgHeightRatio()

  const handleResize = debounce(setRatioHeight, 100)
  
  onMount(() => {
    const img = new Image()
    img.src = src
    img.addEventListener('load', onLoad)
    img.addEventListener('error', onError)

    setRatioHeight()
    window.addEventListener('resize', handleResize)
  })

  onDestroy(() => {
    window.removeEventListener('resize', handleResize)
  })

</script>

{#if loading}
  <Loading {imgHeight } />
{:else if src}
  <div
    data-cid='HouseImage'
    class={twMerge('block bg-no-repeat bg-center bg-contain h-0', $$props.class)}
    style:background-image={`url(${src})`}
    style:height={`${imgHeight}px`}
  ></div>
{:else}
  <div style:height={`${imgHeight}px`}></div>
{/if}