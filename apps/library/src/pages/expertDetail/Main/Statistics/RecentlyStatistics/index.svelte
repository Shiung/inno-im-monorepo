<script lang='ts'>
  import { im } from 'api'
  import { locale } from '$stores'
  import type { ILanguages } from 'env-config'
  import { params } from 'svelte-spa-router'

  import WMSStatistics from './WMSStatistics/index.svelte'
  import HittingRecord from './HittingRecord/index.svelte'
  import RecentTenRecords from './RecentTenRecords/index.svelte'

  let response: Awaited<ReturnType<typeof im.expertStatistics>>
  let loading: boolean

  const fetchData = async (expertId: string, lang: ILanguages) => {
    loading = true
    response = await im.expertStatistics({ query: { expertId }, headers: { 'Accept-Language': lang } })
    loading = false
  }

  $: fetchData($params?.expertId, $locale)
</script>

<div>
  <WMSStatistics data={response?.data?.info || []} {loading} />
  <HittingRecord data={response?.data?.list || []} {loading} />
  <RecentTenRecords data={response?.data?.list || []} {loading} />
</div>
