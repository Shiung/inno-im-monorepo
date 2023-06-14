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
  import { onMount, onDestroy, tick } from 'svelte'
  import { im } from 'api'
  import { im as impb } from 'protobuf'
  import { im as imWs } from 'api/wsMaster'
  import { fly } from 'svelte/transition'

  import { t } from '$stores'
  import { appHeight } from '$stores/layout'
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

  $: isWindow = $displayType === 'window'

  let lastReadId: number

  $: destination = `/topic/chat-room/${$roomId}`

  let subId: string
  let subscription: ReturnType<typeof imWs.subscribe>
  let chatMessages = writable<IChatMessage[]>([])
  let isTransition = false

  const subscribeRoom = (_roomId: number) => {
    subscription = imWs.subscribe(impb.enum.command.PUSH_MESSAGE, ({ data }) => {
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

  const onHeaderClose = async () => {
    isTransition = true
    await tick()
    $minimize = true
  }

  onMount(() => {
    initFetch()
    imWs.activate()
  })

  onDestroy(() => {
    if (subscription) subscription.unsubscribe()
  })
</script>

{#if $minimize}
  <Minimize {lastReadId} {chatMessages} on:click={() => { isTransition = true; $minimize = false }} />
{:else}
  <div
    class="flex-1 flex flex-col bg-white"
    style:min-height={isWindow ? 'auto' : `calc(100 * var(--vh) - ${$height}px)`}
    style:max-height={isWindow ? 'auto' : `calc(100 * var(--vh) - ${$height}px)`}
    style:overflow-y={isWindow ? null : 'scroll'}
    transition:fly|local={{ y: 100 * $appHeight - $height, duration: 500 }}
    on:introend={() => { isTransition = false }}
  >
    <Header on:close={onHeaderClose} />

    {#if initFetchLoading || isTransition}
      <Loading />
    {:else if $chatMessages.length === 0}
      <Empty class="flex-1" title={$t('chat.empty')} />
    {:else}
      <Messages bind:lastReadId {chatMessages} />
    {/if}

    <InputArea />
  </div>
{/if}
