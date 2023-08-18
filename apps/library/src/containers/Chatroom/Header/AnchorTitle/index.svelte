<script lang="ts">
  import { Ripple } from 'ui'
  import type { IPlatformAnchor } from '$src/platform/anchors/types'
  import AnchorImage from '$containers/AnchorImage'
  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import { t } from '$stores'

  let openDetailSheet: boolean = false
  export let anchor: IPlatformAnchor
</script>

<Ripple on:click={() => (openDetailSheet = true)} class="w-[32px] h-[32px] rounded-full p-[1px] flex-none">
  <AnchorImage src={anchor.userImage} class={'block w-full h-full border-imprimary'} borderWidth={1} />
</Ripple>

<div class="ml-2 text-[14px] font-semibold truncate">{$t('chat.anchorTitle', { anchor: anchor?.nickName || '' })}</div>

<AnchorDetailSheet bind:open={openDetailSheet} houseId={anchor.houseId} />