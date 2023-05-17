<script lang="ts">
import Others from './Others.svelte'
import Self from './Self.svelte'

import type { IChatMessage } from 'api/im/types'

export let lastReadId: string
export let message: IChatMessage
export let self: boolean

let dom: HTMLDivElement

// TODO 待雪花算法上後再修正
const checkAndSetLastReadId = (id: string) => {
  if (!lastReadId) return lastReadId = id
  if (Number(id) > Number(lastReadId)) return lastReadId = id
}

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) checkAndSetLastReadId(entry.target.getAttribute('data-id'))
  }
})

$: if (dom) observer.observe(dom)

</script>

<div data-id={message.id} class='rounded-[10px]' bind:this={dom}>
  <svelte:component this={self ? Self : Others} message={message} />
</div>
