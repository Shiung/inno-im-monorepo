<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { Badget } from 'ui'
  import { t } from '$stores'
  import type { IWebAnchor } from 'api/im/types'

  import { StreamLiveStatus } from '$src/constant'

  export let liveStatus: IWebAnchor['liveStatus']
</script>

{#if liveStatus === StreamLiveStatus.LIVE}
  <Badget class={twMerge('inline-flex', $$props.class)} variant="onLine">{$t('anchor.online')}</Badget>
{:else}
  <div class="inline-flex h-[20px]" />
{/if}
