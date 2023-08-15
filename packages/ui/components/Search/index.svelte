<script lang='ts'>
import { createEventDispatcher } from 'svelte'
import Ripple from '../Ripple'
import { pinYin } from 'utils'
import Search from './search.svg'
import SearchClear from './search_clear.svg'

const dispatch = createEventDispatcher()

export let dict: string[] = []

export let placeholder: string = ''
export let value: string
export let height: number = 32
export let dropdownList: boolean = true

let isFocused = false
let dom: HTMLDivElement
let input: HTMLInputElement

$: {
  pinYin.cleanDict()
  pinYin.updateOrCreateDict(dict)
}


let list: string[] = []
let timeout: ReturnType<typeof setTimeout>


$: if (value) {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    list = pinYin.search(value)
  }, 100)
}

const handleClearClick = () => {
  value = ''
  dispatch('clear', { isFocused })
  if(isFocused) input.focus()
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') dispatch('submit')
}

</script>

<div class={$$props.class} bind:this={dom}>
  <div class='relative flex items-center'>
    <Search class='absolute left-[8px]' width={16} height={16} fill='#333333' />
    <!-- 行為順序為 blur -> focus，所以 focus 也需加上 setTimeout -->
    <input class='px-[35px] w-full bg-[#F7F8F9] rounded-[20px] outline-imprimary'
      style:height={`${height}px`}
      on:focus={() => setTimeout(() => isFocused = true, 100)}
      on:blur={() => setTimeout(() => isFocused = false, 100)}
      on:keydown={onKeydown}
      bind:value={value}
      bind:this={input}
      placeholder={placeholder}
    />

    {#if value}
      <Ripple class='flex items-center justify-center absolute right-0 rounded-full w-[35px] h-[35px]'
        on:click={handleClearClick}
      >
        <SearchClear width={16} height={16} />
      </Ripple>
    {/if}

  </div>

  {#if dropdownList}
    <div class='absolute translate-y-1 bg-white max-h-[500px] overflow-scroll im-shadow z-10' style:width={`${dom?.getBoundingClientRect()?.width | 0}px`}>
      {#if isFocused && list && value}
        {#each list as item}
          <div class='h-[40px] w-full bg-white border-b border-[#eeeeee] last:border-none'>
            <Ripple class='flex items-center w-full h-full text-start text-[#333333]' on:click={() => dispatch('select', item)}>
              <Search class='m-[10px]' width={16} height={16} fill='#666666' />
              {item} 
            </Ripple>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>

