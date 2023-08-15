<script lang="ts">
  import { locale } from '$stores'

  import AnchorList from './AnchorList'
</script>

{#key $locale}
  <AnchorList />
{/key}
