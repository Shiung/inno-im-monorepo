<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { slide } from 'svelte/transition'
import Ripple from '../Ripple'
import { pinYin } from 'utils'
import Search from './search.svg'

const dispatch = createEventDispatcher()

export let dict: string[] = []

export let placeholder: string = ''
export let value: string
let dom: HTMLDivElement

$: {
  pinYin.cleanDict()
  pinYin.updateOrCreateDict(dict)
}

$: list = pinYin.search(value)

</script>

<div class={$$props.class} bind:this={dom}>
  <div class='relative flex items-center'>
    <Search class='absolute left-[8px]' width={18} height={18} fill='#333333' />
    <input class='pl-[35px] h-[40px] w-full bg-[#F7F8F9] rounded-[20px] outline-primary'
      bind:value={value}
      placeholder={placeholder} 
    />
  </div>

  <div class='absolute translate-y-1 bg-white max-h-[400px] overflow-scroll' style:width={`${dom?.getBoundingClientRect()?.width | 0}px`}>
    {#if list}
      {#each list as item}
        <div transition:slide|local class='h-[30px] w-full bg-white border-b border-[#eeeeee] last:border-none'>
          <Ripple class='w-full h-full text-start' on:click={() => dispatch('select', item)}>
            {item} 
          </Ripple>
        </div>
      {/each}
    {/if}
  </div>
</div>

