<script lang="ts">
  import { getConfig } from 'env-config'
  import { twMerge } from 'tailwind-merge'
  import { locale } from '$stores'
  import type { ILanguages } from 'env-config'

  const DEFAULT_RESOURCE = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/fe-images/${
    getConfig().VENDERID
  }/logo/primary_logo.png`
  let error: boolean = false
  export let src = DEFAULT_RESOURCE

  const getVdSource = (locale: ILanguages) => {
    if (src !== DEFAULT_RESOURCE) return src

    if (getConfig().vendor_id !== 7) return src

    return ['zh_CN', 'zh_HK'].includes(locale)
      ? `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/fe-images/${getConfig().VENDERID}/logo/primary_zh_logo.png`
      : DEFAULT_RESOURCE
  }
</script>

{#if !error && src}
  <img class={twMerge('block', $$props.class)} src={getVdSource($locale)} on:error={() => (error = true)} alt="" />
{/if}
