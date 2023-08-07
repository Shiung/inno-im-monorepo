<script lang="ts">
  import { im } from 'api'
  import type { IWebAnchor } from 'api/im/types'
  import { Button } from 'ui'
  import { params, push } from 'svelte-spa-router'
  import { onDestroy, onMount } from 'svelte'
  import { locale, getUseLang } from '$stores'

  import Modal, { Header, Mark } from 'ui/components/Modal'

  import Loading from './loading.svelte'
  import BackBar from '$containers/BackBar'
  import StreamingPlayer from '$containers/StreamingPlayer'
  import Chatroom, { controller, setChatInfo } from '$src/containers/Chatroom'

  const isWindow: boolean = true

  let dom: HTMLDivElement
  let title: string = ''
  let loading: boolean = false
  let showModal: boolean = false
  let streaming: Omit<IWebAnchor, 'matchCount'>

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

      title = houseName
      streaming = data

      loading = false
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = () => {
    push('/anchor')
    showModal = false
  }

  onMount(async () => {
    controller.active()
  })

  onDestroy(() => {
    controller.destroy()
  })

  $: useLang = $getUseLang()
  $: initHeight = dom?.getBoundingClientRect().height

  $: houseId = $params?.anchorHouseId
  $: if (houseId) fetchAnchorsHouseDetail(houseId)

  $: if (dom) {
    controller.setChatEnv({
      device: 'wap',
      subscribeBindingChatroom: true
    })

    setChatInfo({
      displayType: isWindow ? 'window' : 'block',
      chatId: houseId,
      height: initHeight
    })
  }
</script>

{#if loading}
  <Loading />

  <Modal bind:show={showModal}>
    <Mark variant="info" />
    <Header variant="mark">{'⛔️⛔️⛔️⛔️⛔️ 不支此援語系'}</Header>
    <div class="mt-[20px]">
      <Button on:click={handleClick}>ok</Button>
    </div>
  </Modal>
{:else}
  <div>
    <div bind:this={dom} class={'sticky w-full top-0 z-30'}>
      <BackBar {title} />
      <StreamingPlayer {streaming} />
    </div>

    <Chatroom />
  </div>
{/if}
