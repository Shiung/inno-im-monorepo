<script lang='ts'>
  import { twMerge } from "tailwind-merge";
  import { createEventDispatcher } from 'svelte'
  export let infos: Array<string> = []
  export let speed: number = 1
  export let loop: boolean = true
  export let count: number = 0

  let boxDom: HTMLDivElement
  let contentDom: HTMLDivElement
  let move: number = 0
  let counting: number = 0

  const dispatch = createEventDispatcher()

  $: boxWidth = boxDom?.getBoundingClientRect().width

  const ticker = () => {
    const scrollWidth =  contentDom?.scrollWidth
    if (Math.abs(move) <= scrollWidth + 15) {
      move -= 1 * speed
    } else {
      if (!loop) {
        if (counting < count) counting ++
        else return onComplete()
      }

      move = 0
    }

    requestAnimationFrame(ticker)
  }
  ticker()

  const onComplete = () => {
    counting = 0
    move = 0

    dispatch('complete')
  }
</script>

<div class={twMerge('w-full overflow-hidden', $$props.class)} bind:this={boxDom}>
  <div
    bind:this={contentDom}
    class={twMerge('relative flex space-x-3 whitespace-nowrap')}
    style:padding-left={`${boxWidth}px`}
    style:left={`${move}px`}>
    {#each infos as info, idx (idx)}
      <span>{info}</span>
    {/each}
  </div>
</div>