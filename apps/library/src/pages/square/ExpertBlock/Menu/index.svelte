<script lang='ts'>
import { onMount } from 'svelte'
import { twMerge } from 'tailwind-merge'
import { Ripple } from 'ui'

import { t, type ITransStore } from '$stores'

interface IItem {
  i18n: string
  onClick: () => void
}

const items: IItem[] = [
  { i18n: 'export.hit', onClick: () => console.log('export.hit') },
  { i18n: 'export.winningStreakKing', onClick: () => console.log('export.winningStreakKing') },
  { i18n: 'export.followUp', onClick: () => console.log('export.followUp') },
]

let actived = 'export.winningStreakKing'

const onClick = (item: IItem) => {
  actived = item.i18n
}



let itemsConteiner: HTMLDivElement
const calBar = (actived: string, _t?: ITransStore): { width: number, left: number } => {
  if (!itemsConteiner) return null

  const idx = items.findIndex((item) => item.i18n === actived)
  const target = itemsConteiner.children[idx] 

  if (!target) return null

  const rect = target.getBoundingClientRect()
  return { width: rect.width, left: rect.left }
}

$: barStyle = calBar(actived, $t)

onMount(() => {
  barStyle = calBar(actived)
})

</script>

<div class={twMerge('relative flex flex-col justify-center', $$props.class)}>
  <div class='flex w-full items-center justify-around mt-[8px]' bind:this={itemsConteiner}>
    {#each items as item}

      <Ripple class={twMerge(
          'text-[#999999] text-[14px] p-2',
          actived === item.i18n && 'text-imprimary'
        )} 
        on:click={() => onClick(item)}
      >
        <div> {$t(item.i18n)} </div>
      </Ripple>

    {/each}
  </div>

  <div class='absolute will-change-position h-[2px] bg-imprimary duration-300 ease-out bottom-0' 
    style:left={`${barStyle?.left}px`}
    style:width={`${barStyle?.width}px`}
    style:opacity={barStyle ? 1 : 0}
  />
</div>
