<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import stomp, { activate } from 'api/stompMaster'
import { Ripple } from 'ui'

import { t } from '$stores'
import Empty from '$src/containers/Empty'

import Message from './Message.svelte'
import InputArea from './InputArea/index.svelte'
import Info from './images/info.svg'
import Close from './images/close.svg'

import type { IChatMessage } from 'api/im/types'
import type { Subscription } from 'api/stompMaster'

export let roomId: number = 124
export let userId: string

let subscription: Subscription
let chatMessages = writable<IChatMessage[]>([])

const subscribeRoom = (_roomId: number) => {
  subscription = stomp
    .watch({ destination: `/topic/chat-room/${roomId}` })
    .subscribe((message) => chatMessages.update((messages) => [...messages, JSON.parse(message.body) ]))
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

<div class='px-[15px] bg-white min-h-[100vh]'>
  <div class='flex items-center justify-between'>
    <div class='flex'>
      <div class='text-[18px] font-semibold'> {$t('chat.title')} </div>
      <Ripple class='rounded-full flex items-center justify-center w-[25px] h-[25px]'
        on:click={() => console.log('info')}
      >
        <Info width={20} height={20} fill='#999999' />
      </Ripple>
    </div>

    <Ripple class='rounded-full' on:click={() => console.log('close')}>
      <Close width={20} height=[20] fill='#333333' />
    </Ripple>
  </div>

  {#if $chatMessages.length === 0}
    <Empty class='h-[300px]' title={$t('chat.empty')} />
  {:else}

    <div class='space-y-[12px]'>
      {#each $chatMessages as message}
        <Message message={message} self={userId === message.source} />
      {/each}
    </div>
  {/if}

  <InputArea />
</div>
