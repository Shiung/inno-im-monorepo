<script lang="ts">
  import { getConfig } from 'env-config'

  export let betItem

  const { FE_CDN_URL, DEPLOY_ENV, VENDERID } = getConfig()
  const { nickName = '', account = '', vip } = betItem
  const name = (nickName || account).substring(0, 3) + '***** :'
  const vipUrl = `${FE_CDN_URL}/frontend/${DEPLOY_ENV}/fe-images/${VENDERID}/chatRoom/vip/${vip}.png`
</script>

<div class="flex">
  {#if vip}
    <img class="w-[36px] h-[14px] mr-[5px]" src={vipUrl} alt="" />
  {/if}
  <div class="text-[rgb(var(--im-monorepo-primary))]">
    {name}
  </div>
</div>
