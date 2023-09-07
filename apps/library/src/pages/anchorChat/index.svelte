<script lang="ts">
  import { onMount } from 'svelte'
  import { params, push } from 'svelte-spa-router'
  import { im } from 'api'
  import type { IWebAnchor } from 'api/im/types'
  import { locale, getUseLang, t } from '$stores'
  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  import ChatRoomLoading from '$containers/Chatroom/Loading.svelte'
  import BackBar from '$containers/BackBar'

  import Loading from './loading.svelte'
  import Streaming from './Streaming.svelte'
  import Chatroom, { controller, setChatInfo } from '$src/containers/Chatroom'

  let title: string = ''
  let loading: boolean = false
  let showModal: boolean = false
  let streaming: Omit<IWebAnchor, 'matchCount'>
  let height: number

  const fetchAnchorsHouseDetail = async (houseId: string) => {
    try {
      loading = true

      const response = await im.webAnchorHouseDetail({
        query: { houseId: houseId },
        headers: { 'Accept-Language': $locale }
      })

      const { data } = response || {}
      const { lang, houseName } = data || {}

      if (useLang !== lang) return (showModal = true)

      loading = false
      
      title = houseName
      streaming = data
    } catch (error) {
      console.error(error)
      showModal = true
    }
  }

  const handleClick = () => {
    push('/anchor')
    showModal = false
  }

  const onStreamingHeightChange = (videoHeight: number) => {
    height = videoHeight + 44
  }

  $: useLang = $getUseLang()
  
  $: houseId = $params?.anchorHouseId

  $: houseId && fetchAnchorsHouseDetail(houseId)
  
  $: setChatInfo({
    displayType: 'window',
    size: 'normal',
    useScrollCollapse: false,
    height: height,
    chatId: houseId,
    iid: 0,
    showBetEnable: false,
    expandAnimation: false,
    header: 'normal',
    subscribeBindingChatroom: true
  })

  onMount(() => {
    controller.active()
  })
</script>

{#if loading}
  <Loading />

  <Modal bind:show={showModal}>
    <Mark variant="info" />
    <Header variant="mark">{$t('anchor.notSouport')}</Header>
    <div class="mt-[20px]">
      <Button on:click={handleClick}>{$t('common.confirm')}</Button>
    </div>
  </Modal>
{:else}
  <div data-cid='AnchorChat'>
    <div>
      <BackBar {title} />
      <Streaming {streaming} on:heightChange={(e) => onStreamingHeightChange(e.detail)} />
    </div>

    {#if !height}
      <ChatRoomLoading />
    {:else}
      <Chatroom />
    {/if}
  </div>
{/if}
