<script lang='ts'>
  import { twMerge } from "tailwind-merge";
  export let infos: Array<string> = []

  let boxDom: HTMLDivElement
  let contentDom: HTMLDivElement
  let move: number = 0

  $: boxWidth = boxDom?.getBoundingClientRect().width

  const ticker = () => {
    const scrollWidth =  contentDom?.scrollWidth
    if (Math.abs(move) <= scrollWidth + 15) {
      move -= 1
    } else {
      move = 0
    }

    requestAnimationFrame(ticker)
  }
  ticker()
</script>

<div class={twMerge('w-full overflow-hidden', $$props.class)} bind:this={boxDom}>
  <div
    bind:this={contentDom}
    class={twMerge('relative flex space-x-3')}
    style:padding-left={`${boxWidth}px`}
    style:left={`${move}px`}>
    {#each infos as info, idx (idx)}
      <span>{info}</span>
    {/each}
  </div>
</div>