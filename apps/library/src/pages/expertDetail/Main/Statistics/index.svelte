<script lang='ts'>
  import RecentlyStatistics from './RecentlyStatistics/index.svelte'

  import RecentlyHitting from './RecentlyHitting/index.svelte'

  import { locale } from '$stores'
</script>

<RecentlyStatistics />

{#key $locale}
  <RecentlyHitting />
{/key}