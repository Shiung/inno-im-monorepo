<script lang="ts">
  import type { IChatMessage } from 'api/im/types'

  import { getInfo } from '../../context'
  import { chatCompHeight } from '../../store'

  import Others from './Others.svelte'
  import Self from './Self.svelte'

  export let lastReadId: number
  export let message: IChatMessage
  export let self: boolean

  let dom: HTMLDivElement

  const { height } = getInfo()
  const { header: headerHeight, input: inputHeight } = $chatCompHeight

  // TODO 待雪花算法上後再修正
  const checkAndSetLastReadId = (id: string) => {
    const _id = Number(id)
    if (!lastReadId) return (lastReadId = _id)
    if (_id > lastReadId) return (lastReadId = _id)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.boundingClientRect.y > 0) {
          checkAndSetLastReadId(entry.target.getAttribute('data-id'))
        }
      }
    },
    { rootMargin: `0px 0px -${inputHeight}px 0px` }
  )

  $: boxContainerHeight = window.innerHeight - $height - headerHeight - inputHeight

  $: if (dom) {
    if (dom.offsetTop <= boxContainerHeight) checkAndSetLastReadId(dom.getAttribute('data-id'))
    observer.observe(dom)
  }
</script>

<svelte:component this={self ? Self : Others} {message} bind:thisEl={dom} />
