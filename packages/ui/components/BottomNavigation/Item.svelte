<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { createEventDispatcher } from 'svelte'
import Ripple from '../Ripple'

const dispatch = createEventDispatcher()

export let active: boolean
export let icon: () => Promise<any>
export let text: string | number
export let ripple: boolean | string
export let color: string

const fetchIcon = async () => {
  const res = await icon()
  return res.default
}

let promise = fetchIcon()

let dom: HTMLButtonElement
const onClick = (e) => {
  console.log(e, dom.getBoundingClientRect())
  dispatch('click')
}

</script>

<Ripple 
  class={twMerge('flex flex-col flex-1 items-center',
    active && 'overflow-visible'
  )}
  ripple={!active && ripple} on:click={onClick}
  bind:dom={dom}
>
  <div style:transform={active && 'scale(1.5) translateY(-5px)'}>
  {#await promise then Icon}
    <Icon class='mt-2' width={20} height={20} fill={active ? color : '#BBBBBB'} />
  {/await}
  </div>

  <div class='text-[11px]' style:color={active ? color : '#BBBBBB'}> {text} </div>
</Ripple>

