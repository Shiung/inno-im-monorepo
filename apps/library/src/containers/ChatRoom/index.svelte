<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { im } from 'api'
import stomp, { activate } from 'api/stompMaster'

import { t } from '$stores'
import Empty from '$src/containers/Empty'

import Minimize from './Minimize/index.svelte'
import Header from './Header/index.svelte'
import Loading from './Loading.svelte'
import Messages from './Messages/index.svelte'
import InputArea from './InputArea/index.svelte'

import type { IChatMessage } from 'api/im/types'
import type { Subscription } from 'api/stompMaster'

export let fixed: boolean = false
export let height: number
export let minimize: boolean = false

export let roomId: number = 124
export let userId: string = 'loki'
export let userVip: number = 6
export let isLogin: boolean = true
export let isCharged: boolean = true
export let vipLimit: number = 6
export let frequency: number = 5000

let lastReadId: string

$: destination = `/topic/chat-room/${roomId}`

let subId: string
let subscription: Subscription
let chatMessages = writable<IChatMessage[]>([])

const subscribeRoom = (_roomId: number) => {
  subscription = stomp
    .watch({ destination })
    .subscribe((message) => {
      if (!subId) subId = message.headers.subscription
      chatMessages.update((messages) => [...messages, JSON.parse(message.body) ])
    })
}

$: if (roomId) subscribeRoom(roomId)

let initFetchLoading: boolean = true
const initFetch = async () => {
  const res = await im.chatroomPastMessage({ query: { roomId, quantity: 30 }})
  chatMessages.update(messages => [...res.data.list, ...messages])
  initFetchLoading = false
}

onMount(() => {
  initFetch()
  activate()
})

onDestroy(() => {
  if (subscription) subscription.unsubscribe()
  stomp.deactivate()
})

</script>

{#if minimize}

  <Minimize {lastReadId} {chatMessages} on:click={() => minimize = false} />

{:else}

  <div class='flex-1 flex flex-col bg-white overflow-y-scroll' style:max-height={fixed ? 'auto' : `calc(100vh - ${height}px)`}>
    <Header on:close={() => minimize = true}/>

    {#if initFetchLoading}
      <Loading />
    {:else}

      {#if $chatMessages.length === 0}
        <Empty class='flex-1' title={$t('chat.empty')} />
      {:else}
        <Messages bind:lastReadId={lastReadId} {chatMessages} {userId} {roomId} />
      {/if}

    {/if}

    <InputArea {userId} {userVip} {subId} {destination} {isLogin} {isCharged} {vipLimit} {frequency} />
  </div>
{/if}
