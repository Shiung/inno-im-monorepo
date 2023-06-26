<script lang='ts'>
import { onMount } from 'svelte'
import { twMerge } from 'tailwind-merge'
import { Ripple } from 'ui'

import { t, type ITransStore } from '$stores'

import type { IExpertMenu } from './type'

export let menu: IExpertMenu[]
export let active: IExpertMenu['type']

const onClick = (item: IExpertMenu) => {
  active = item.type
}

let itemsContainer: HTMLDivElement
const calBar = (active: IExpertMenu['type'], _t?: ITransStore): { width: number, left: number } => {
  if (!itemsContainer) return null

  const idx = menu.findIndex((item) => item.type === active)
  const target = itemsContainer.children[idx] 

  if (!target) return null

  const rect = target.getBoundingClientRect()
  return { width: rect.width, left: rect.left }
}

$: barStyle = calBar(active, $t)

onMount(() => {
  barStyle = calBar(active)
})

</script>

<div class={twMerge('relative flex flex-col justify-center', $$props.class)}>
  <div class='flex w-full items-center justify-around mt-[8px]' bind:this={itemsContainer}>
    {#each menu as item}

      <Ripple class={twMerge(
          'text-[#999999] text-[14px] p-2',
          active === item.type && 'text-imprimary'
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
