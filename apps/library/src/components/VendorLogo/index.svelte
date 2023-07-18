<script lang="ts">
  import { getConfig } from 'env-config'
  import { twMerge } from 'tailwind-merge'

  let error: boolean = false
  export let src = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/fe-images/${getConfig().VENDERID}/logo/primary_logo.png`
</script>

{#if !error && src}
  <img class={twMerge('block', $$props.class)} src={src} on:error={() => error = true} alt='' />
{/if}