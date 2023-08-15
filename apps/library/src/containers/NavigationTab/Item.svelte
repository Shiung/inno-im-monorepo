<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import Ripple from 'ui/components/Ripple'
  import { t } from '$stores'

  export let active: boolean
  export let icon: () => Promise<any>
  export let text: string
  export let component: any

  const fetchIcon = async () => {
    const res = await icon()
    return res.default
  }

  let promise = fetchIcon()
</script>

<Ripple
  class={twMerge(
    'relative h-full flex justify-center items-center py-[8px] px-[12px] rounded-[32px] space-x-[8px] select-none',
    active ? 'bg-imprimary pointer-events-none' : 'bg-white',
    component ? 'overflow-visible' : 'overflow-hidden'
  )}
  ripple={!component && '#fff'}
  on:click
>
  <div>
    {#await promise then Icon}
      <Icon width={20} height={20} fill={active ? '#fff' : '#BBBBBB'} />
    {/await}

    {#if component}
      <div class={component.className}>
        <svelte:component this={component.item} />
      </div>
    {/if}
  </div>

  <div class="text-[16px]" style:color={active ? '#fff' : '#BBBBBB'}>
    {$t(text)}
  </div>
</Ripple>
