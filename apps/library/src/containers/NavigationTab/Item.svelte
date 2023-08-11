<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { createEventDispatcher } from 'svelte'
  import Ripple from 'ui/components/Ripple'
  import { t } from '$stores'

  const dispatch = createEventDispatcher()

  export let active: boolean
  export let icon: () => Promise<any>
  export let text: string

  const fetchIcon = async () => {
    const res = await icon()
    return res.default
  }

  let promise = fetchIcon()

  const onClick = () => {
    if (active) return
    dispatch('click')
  }
</script>

<Ripple
  class={twMerge(
    'h-full flex justify-center items-center py-[8px] px-[12px] rounded-[32px] space-x-[8px]',
    active ? 'bg-imprimary' : 'bg-white'
  )}
  ripple={!active && '#fff'}
  on:click={onClick}
>
  <div>
    {#await promise then Icon}
      <Icon width={20} height={20} fill={active ? '#fff' : '#BBBBBB'} />
    {/await}
  </div>

  <div class="text-[16px]" style:color={active ? '#fff' : '#BBBBBB'}>
    {$t(text)}
  </div>
</Ripple>
