<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import { initEnv, initInfo } from './context'
  import type { IChatroomEnv, IChatroomInfo } from './context'

  let env = writable(initEnv)
  export const setChatEnv = (_env: Partial<IChatroomEnv>) => env.update((e) => ({ ...e, ..._env }))

  let info = writable(initInfo)
  export const setChatInfo = (_info: Partial<IChatroomInfo>) =>
    info.update((e) => ({ ...e, ..._info }))
</script>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { im as impb } from 'protobuf'
  import { im as imWs } from 'api/wsMaster'

  import { t } from '$stores'
  import Empty from '$src/containers/Empty'

  import { setInfo, setEnv } from './context'
  import Minimize from './Minimize/index.svelte'
  import Header from './Header/index.svelte'
  import Loading from './Loading.svelte'
  import Messages from './Messages/index.svelte'
  import InputArea from './InputArea/index.svelte'

  import type { IChatMessage } from 'api/im/types'

  const { roomId } = setInfo($info)
  const { minimize, displayType, height } = setEnv($env)
  $: setEnv($env)
  $: setInfo($info)

  let lastReadId: number

  let subscription: ReturnType<typeof imWs.subscribe>
  let chatMessages = writable<IChatMessage[]>([])

  // TODO: subscribePushMessage has to move to upper level.
  const subscribePushMessage = () => {
    subscription = imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
      chatMessages.update((messages) => [...messages, data])
    })
  }

  const subscribeRoom = (_roomId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.SUBSCRIBE_CHAT,
      data: { chatIds: [String($roomId)] }
    })
  }

  const unsubscribeRoom = (_roomId: string) => {
    imWs.publish({
      eventkey: impb.enum.command.UNSUBSCRIBE_CHAT,
      data: { chatIds: [String($roomId)] }
    })
  }

  let perviousRoomId: string
  const subscribeNewAndUnsubscribePrevious = (_roomId: string) => {
    if (perviousRoomId && perviousRoomId !== _roomId) unsubscribeRoom(perviousRoomId)
    subscribeRoom(_roomId)
    perviousRoomId = _roomId
  }

  $: if ($roomId) subscribeNewAndUnsubscribePrevious($roomId)

  let initFetchLoading: boolean = true

  const initChatroom = async () => {
    const res = await imWs.publish({
      eventkey: impb.enum.command.FETCH_MESSAGES,
      data: { pointer: 0, chatId: $roomId }
    })
    console.log('FETCH_MESSAGES: ', res)
    // chatMessages.update((messages) => [...res.data.list, ...messages])
    initFetchLoading = false
  }

  onMount(() => {
    // TODO: change to real data.
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiZmM4NzU3MWYtNDQzZS00MDI0LWE1NGMtZjEyNTkwMWY3Y2E5IiwidmVuZG9ySWQiOjEsInR5cGUiOjEsInVzZXJJZCI6MzA3Njg3LCJsb2dpbkRvbWFpbiI6ImVuLXZkMDAxLXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg3NzUyNzMyMDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMTU0MDk2MDAwLCJ2ZW5kb3IiOiJkdjIiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJibHRlc3QwMSJ9.T4wC3cLQP1QtQOUKs8pX7sFd0TxAd7VzBep9_dLzFfk'
    const referer = 'aHR0cHM6Ly9lbi12ZDAwMS10aWdlci1wb3J0YWwuaW5ub2Rldi5zaXRlLw=='

    imWs.setParams({ account: 'bltest01', vd: 1, lang: 'zh_CN', referer: referer })
    imWs.setSubprotocols(token)
    imWs.activate()
    initChatroom()
    subscribePushMessage()
  })

  onDestroy(() => {
    if (subscription) subscription.unsubscribe()
  })
</script>

{#if $minimize}
  <Minimize {lastReadId} {chatMessages} on:click={() => ($minimize = false)} />
{:else}
  <div
    class="flex-1 flex flex-col bg-white overflow-y-scroll"
    style:min-height={$displayType === 'window' ? 'auto' : `calc(100vh - ${$height}px)`}
    style:max-height={$displayType === 'window' ? 'auto' : `calc(100vh - ${$height}px)`}
  >
    <Header on:close={() => ($minimize = true)} />

    {#if initFetchLoading}
      <Loading />
    {:else if $chatMessages.length === 0}
      <Empty class="flex-1" title={$t('chat.empty')} />
    {:else}
      <Messages bind:lastReadId {chatMessages} />
    {/if}

    <InputArea />
  </div>
{/if}
