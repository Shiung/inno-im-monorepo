<script lang='ts'>
import { onMount, onDestroy } from 'svelte'
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
let hillTop: number = 15

let items: HTMLDivElement
const calculateHill = (items: HTMLDivElement) => {
  if (!items) return

  const activedIdx = icons.findIndex(item => item.id === active)
  const actived = items?.children[activedIdx]?.getBoundingClientRect()
  if (!actived) return

  const middle = actived.left + actived.width / 2 
  hillLeft = middle - hillWidth / 2
  hillTop = 0
}


let container: HTMLDivElement
let blockHeight: number = 0

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const height = entry?.contentRect?.height
    if (height) blockHeight = height
  }
})


$: if (active) calculateHill(items)

onMount(() => {
  resizeObserver.observe(container)
})

onDestroy(() => {
  resizeObserver.unobserve(container)
})

</script>

<div data-cid='BottomNavigation'>
  <div class='w-full fixed bottom-0' bind:this={container}>
    <img class='relative duration-300 ease-out will-change-[left] will-change-[top]'
      src={hill} 
      style:left={`${hillLeft}px`}
      style:top={`${hillTop}px`}
      alt='' 
    />

    <div class='flex justify-around bg-white' style:box-shadow='0 0 10px 0 rgba(0,0,0,.1)' bind:this={items}>
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
