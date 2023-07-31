<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { createEventDispatcher } from 'svelte'
  import Ripple from '../Ripple'

  import type { IIcon } from './types'

  const dispatch = createEventDispatcher()

  export let active: boolean
  export let icon: IIcon['icon']
  export let component: IIcon['component']
  export let text: string | number
  export let ripple: boolean | string
  export let color: string

  const fetchIcon = async () => {
    const res = await icon()
    return res.default
  }

  let promise = fetchIcon()

  let dom: HTMLButtonElement
  const onClick = () => {
    const clientRect = dom.getBoundingClientRect()
    const middlePosition = clientRect.left + clientRect.width / 2
    if (active) return
    dispatch('click', middlePosition)
  }
</script>

<Ripple class={twMerge('flex flex-col flex-1 items-center rounded-[10px]')} ripple={!active && ripple} on:click={onClick} bind:dom>
  <div style:transform={active ? 'scale(1.5) translateY(-5px)' : ''}>
    {#await promise then Icon}
      <Icon class="mt-[15px]" width={20} height={20} fill={active ? color : '#BBBBBB'} />
    {/await}

    {#if component}
      <div class={component.className}>
        <svelte:component this={component.item} />
      </div>
    {/if}
  </div>

  <div class="text-[11px]" style:color={active ? color : '#BBBBBB'}>{text}</div>
</Ripple>
