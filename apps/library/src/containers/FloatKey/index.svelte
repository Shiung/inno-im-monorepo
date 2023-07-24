<script lang="ts">
  import Container from './Container.svelte'
  import Minimize from './Minimize/index.svelte'
  import Expand from './Expand/index.svelte'

  let remainCount = 50
  let totalCount = 50
</script>

<Container>
  <Minimize slot="minimize" {remainCount} {totalCount} />
  <Expand slot="expand" />
</Container>
