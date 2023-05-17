<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import stomp, { activate } from 'api/stompMaster'

import { t } from '$stores'
import Empty from '$src/containers/Empty'

import Header from './Header/index.svelte'
import Messages from './Messages/index.svelte'
import InputArea from './InputArea/index.svelte'

import type { IChatMessage } from 'api/im/types'
import type { Subscription } from 'api/stompMaster'

export let roomId: number = 124
export let userId: string = 'loki'

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

onMount(() => {
  activate()
})

onDestroy(() => {
  if (subscription) subscription.unsubscribe()
  stomp.deactivate()
})

</script>

<div class='flex flex-col bg-white min-h-[100vh] max-h-[100vh]'>
  <Header />

  {#if $chatMessages.length === 0}
    <Empty class='flex-1' title={$t('chat.empty')} />
  {:else}
    <Messages messages={$chatMessages} userId={userId} />
  {/if}

  <InputArea userId={userId} subId={subId} destination={destination} />
</div>
