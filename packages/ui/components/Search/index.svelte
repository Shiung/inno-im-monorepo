<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import { slide } from 'svelte/transition'
import Ripple from '../Ripple'
import { pinYin } from 'utils'
import Search from './search.svg'
import SearchClear from './search_clear.svg'


const dispatch = createEventDispatcher()

export let dict: string[] = []

export let placeholder: string = ''
export let value: string
let dom: HTMLDivElement

$: {
  pinYin.cleanDict()
  pinYin.updateOrCreateDict(dict)
}


let list: string[] = []
let timeout: ReturnType<typeof setTimeout>

// $: list = pinYin.search(value)

$: if (value) {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    list = pinYin.search(value)
  }, 100)
}

const handleClearClick = () => {
  value = ''
  dispatch('clear')
}

</script>

<div class={$$props.class} bind:this={dom}>
  <div class='relative flex items-center'>
    <Search class='absolute left-[8px]' width={18} height={18} fill='#333333' />
    <input class='px-[35px] h-[40px] w-full bg-[#F7F8F9] rounded-[20px] outline-imprimary'
      bind:value={value}
      placeholder={placeholder} 
    />

    {#if value}
      <Ripple class='flex items-center justify-center absolute right-0 rounded-full w-[35px] h-[35px]'
        on:click={handleClearClick}
      >
        <SearchClear width={18} height={18} />
      </Ripple>
    {/if}

  </div>

  <div class='absolute translate-y-1 bg-white max-h-[500px] overflow-scroll im-shadow z-10' style:width={`${dom?.getBoundingClientRect()?.width | 0}px`}>
    {#if list && value}
      {#each list as item}
        <div class='h-[40px] w-full bg-white border-b border-[#eeeeee] last:border-none'>
          <Ripple class='flex items-center w-full h-full text-start text-[#333333]' on:click={() => dispatch('select', item)}>
            <Search class='m-[10px]' width={18} height={18} fill='#666666' />
            {item} 
          </Ripple>
        </div>
      {/each}
    {/if}
  </div>
</div>

