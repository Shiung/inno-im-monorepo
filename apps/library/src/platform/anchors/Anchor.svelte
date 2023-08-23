<script lang="ts">
  import type { IWebAnchor, IWebAnchorMatch } from 'api/im/types'

  import AnchorCard from '$containers/AnchorCard'
  import { SID } from '$src/constant'

  export let anchor: IWebAnchor
  export let matchInfo: { data: IWebAnchorMatch } = null

  $: isMatchType = anchor.sid !== SID.deposit
</script>

<div data-id={anchor.houseId} class={$$props.class}>
  <AnchorCard anchor={anchor} match={isMatchType ? matchInfo?.data : null} />
</div>