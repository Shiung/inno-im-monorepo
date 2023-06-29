<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import CheckBox from './CheckBox.svelte'
  export let betItem
  export let uuid: string = ''

  const dispatch = createEventDispatcher()

  let dom: HTMLDivElement

  $: heignt = `${dom?.firstElementChild?.clientHeight || 0}px`
</script>

<div
  class="grid grid-cols-[auto_9fr] border-b-[0.5px] border-[#ddd] px-[10px] pt-[12px]"
  on:click={() => dispatch('active', betItem)}
  on:keypress
>
  <div class="flex items-center" style:height={heignt}>
    <CheckBox {betItem} active={uuid} />
  </div>
  <div class="text-[12px] text-[#333] pl-[10px] space-y-[4px]" bind:this={dom}>
    <slot />
  </div>
</div>
