<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
import { twMerge } from 'tailwind-merge'
import Item from './Item.svelte'
import hill from './images/iconSelect.png'

interface IIcon {
  id: string
  icon: () => Promise<any>
  text: string | number
  disabled?: boolean
  onClick: () => void
}

export let icons: IIcon[]
export let ripple: boolean | string
export let active: string | undefined
export let color: string

const hillWidth = 125
let hillLeft: number
let showHill: boolean

let items: HTMLDivElement
const calculateHill = (active: string | undefined, items: HTMLDivElement) => {
  if (!items) return

  const activedIdx = icons.findIndex(item => item.id === active)
  const actived = items?.children[activedIdx]?.getBoundingClientRect()

  if (!actived) {
    showHill = false
    return 
  }

  const middle = actived.left + actived.width / 2 
  hillLeft = middle - hillWidth / 2
  showHill = true
}


let container: HTMLDivElement
let blockHeight: number = 0

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const height = entry?.contentRect?.height
    if (height) blockHeight = height
  }
})


$: calculateHill(active, items)

onMount(() => {
  resizeObserver.observe(container)
})

onDestroy(() => {
  resizeObserver.unobserve(container)
})

</script>

<div data-cid='BottomNavigation'>
  <div class='w-full fixed bottom-0' bind:this={container}>
    <img class={twMerge('relative duration-300 ease-out will-change-[left] will-change-[top]',
      showHill && 'z-[11]'
    )}
      src={hill} 
      style:left={`${hillLeft}px`}
      style:top={`${showHill ? 0 : 15}px`}
      alt='' 
    />

    <div class='flex relative justify-around bg-white z-10' style:box-shadow='0 0 10px 0 rgba(0,0,0,.1)' bind:this={items}>
      {#each icons as item}

        <Item
          color={color}
          ripple={!item.disabled && ripple}
          active={item.id === active}
          icon={item.icon} 
          text={String(item.text)}
          on:click={!item.disabled && item.onClick}
        />

      {/each}
    </div>
  </div>

  <div style:height={`${blockHeight}px`} />

</div>
