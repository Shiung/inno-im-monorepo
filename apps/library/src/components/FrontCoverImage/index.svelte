<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import DefaultImage from './DefaultImage.svelte'

  export let src: string

  let isError = false

  $: if (!src) isError = true
</script>

{#if !isError}
  <img class={twMerge($$props.class)} {src} on:error={() => (isError = true)} alt="" />
{:else}
  <DefaultImage class={$$props.class}/>
{/if}
