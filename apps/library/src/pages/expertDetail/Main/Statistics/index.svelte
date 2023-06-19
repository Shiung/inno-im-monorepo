<script lang='ts'>
  import RecentlyStatistics from './RecentlyStatistics/index.svelte'

  import RecentlyHitting from './RecentlyHitting/index.svelte'

  import { locale } from '$stores'
  setTimeout(() => {
    locale.set('en_US')
  }, 3000)
</script>

<RecentlyStatistics />

{#key $locale}
  <RecentlyHitting />
{/key}