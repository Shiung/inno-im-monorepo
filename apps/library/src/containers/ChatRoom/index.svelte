<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { im } from 'api'
import stomp, { activate } from 'api/stompMaster'

import { t } from '$stores'
import Empty from '$src/containers/Empty'

import Header from './Header/index.svelte'
import Loading from './Loading.svelte'
import Messages from './Messages/index.svelte'
import InputArea from './InputArea/index.svelte'

import type { IChatMessage } from 'api/im/types'
import type { Subscription } from 'api/stompMaster'

export let roomId: number = 124
export let userId: string = 'loki'
export let userVip: number = 6
export let isLogin: boolean = true
export let isCharged: boolean = true
export let vipLimit: number = 6
export let frequency: number = 5000

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

<div class='flex flex-col bg-white min-h-[100vh] max-h-[100vh]'>
  <Header />

  {#if initFetchLoading}
    <Loading />
  {:else}

    {#if $chatMessages.length === 0}
      <Empty class='flex-1' title={$t('chat.empty')} />
    {:else}
      <Messages {chatMessages} {userId} {roomId} />
    {/if}

  {/if}

  <InputArea {userId} {userVip} {subId} {destination} {isLogin} {isCharged} {vipLimit} {frequency} />
</div>
