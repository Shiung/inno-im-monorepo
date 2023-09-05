<script lang="ts">
  import { Ripple } from 'ui'
  import { im } from 'api'
  import type { IWebAnchorDetail } from 'api/im/types'

  import AnchorImage from '$containers/AnchorImage'
  import AnchorDetailSheet from '$containers/AnchorDetailSheet'
  import { t, locale } from '$stores'
  import { CODE_STATUS_OK } from '$src/constant'

  export let anchorId: IWebAnchorDetail['query']['houseId']
  
  const defaultAnchor = { userImage: '', nickName: '', personalIntroduction: ''}
  let openDetailSheet: boolean = false
  let loading: boolean = false
  let anchor: IWebAnchorDetail['res']['data'] = defaultAnchor

  const fetchAnchorDetail = async () => {
    try {
      loading = true
      const response = await im.webAnchorDetail({
        query: { houseId: anchorId },
        headers: { 'Accept-Language': $locale }
      })

      if (response.code === CODE_STATUS_OK) {
        anchor = response?.data || defaultAnchor
      }
    } catch (error) {
      console.error("fetchAnchorDetail", error)
      anchor = defaultAnchor
    } finally {
      loading = false
    }
  }
  $: if (anchorId) fetchAnchorDetail()
</script>

{#if loading}
  <div class='w-[32px] h-[32px] rounded-full p-[1px] flex-none bg-[#eee] animate-pulse'></div>
  <div class="w-[80px] h-[20px] ml-2 rounded-[10px] bg-[#eee] animate-pulse"></div>
{:else}
  <Ripple on:click={() => (openDetailSheet = true)} class="w-[32px] h-[32px] rounded-full p-[1px] flex-none">
    <AnchorImage src={anchor?.userImage} class={'block w-full h-full border-imprimary'} borderWidth={1} />
  </Ripple>

  <div class="ml-2 text-[14px] font-semibold truncate">{$t('chat.anchorTitle', { anchor: anchor?.nickName || '' })}</div>

  <AnchorDetailSheet bind:open={openDetailSheet} houseId={anchorId} />
{/if}