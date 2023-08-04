<script lang="ts">
  import Container from './Container.svelte'
  import Minimize from './Minimize/index.svelte'
  import Expand from './Expand/index.svelte'
  import { userKeyInfo } from '$stores'

  $: remainCount = $userKeyInfo.remainCount || 0
  $: totalCount = $userKeyInfo.totalCount || 0
</script>

<Container>
  <Minimize slot="minimize" {remainCount} {totalCount} />
  <Expand slot="expand" {remainCount} />
</Container>
