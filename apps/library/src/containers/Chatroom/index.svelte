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
  import { im } from 'api'
  import { im as impb } from 'protobuf'
  import ws from 'api/wsMaster'

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

  $: destination = `/topic/chat-room/${$roomId}`

  let subId: string
  let subscription: ReturnType<typeof ws.subscribe>
  let chatMessages = writable<IChatMessage[]>([])

  const subscribeRoom = (_roomId: number) => {
    subscription = ws.subscribe(impb.enum.command.PUSH_MESSAGE, ({ data }) => {
      chatMessages.update((messages) => [...messages, data])
    })
  }

  $: if ($roomId) subscribeRoom($roomId)

  let initFetchLoading: boolean = true
  const initFetch = async () => {
    const res = await im.chatroomPastMessage({ query: { roomId: $roomId, quantity: 30 } })
    chatMessages.update((messages) => [...res.data.list, ...messages])
    initFetchLoading = false
  }

  onMount(() => {
    initFetch()
    ws.activate()
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

    <InputArea {destination} {subId} />
  </div>
{/if}
