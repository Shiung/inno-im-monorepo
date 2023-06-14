<script lang="ts">
  import { params, replace } from 'svelte-spa-router'

  import HeaderNavigation from '$containers/HeaderNavigation'
  
  import ExpertList from './List/index.svelte'

  import { locale } from '$stores'
  import { convertSid, type SidType } from 'utils'

  const headNavIcons: { sid: SidType; onClick: () => void }[] = [
    {
      sid: 0,
      onClick: () => replace('/expert/0')
    },
    {
      sid: 1,
      onClick: () => replace('/expert/1')
    },
    {
      sid: 2,
      onClick: () => replace('/expert/2')
    }
  ]

  $: sid = convertSid($params?.expertSid)
</script>

<div data-cid="Expert">
  <HeaderNavigation active={sid} icons={headNavIcons} />

  {#key $locale}
    <ExpertList sid={sid} />
  {/key}
</div>
