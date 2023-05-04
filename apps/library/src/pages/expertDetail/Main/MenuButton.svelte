<script lang='ts'>
import { Ripple } from 'ui'
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

export let actived: boolean
export let type: 'plan' | 'statistics'

const primaryColor = 'rgb(var(--im-monorepo-primary))'
</script>

<Ripple class='flex-1 h-full' on:click={() => dispatch('click', type)}>
  <div class='h-full w-full flex items-center justify-center will-change duration-300 transition border-b-[2px]'
    style:font-weight={actived ? '600' : 'normal'}
    style:color={actived ? primaryColor : '#999999'}
    style:border-color={actived ? primaryColor : 'white'}
  >
    <slot />
  </div>
</Ripple>
