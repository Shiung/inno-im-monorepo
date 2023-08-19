<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  export let open: boolean = false
  export let initHeight: (innerHeight: number) => number
  export let onDismiss: () => void = () => {}
  export let absolute: boolean = false
  export let opacity: number = 0

  let _open: boolean = open
  let height: number
  let _initHeight: number

  const mount = () => {
    const html = document.getElementsByTagName('html')[0]
    html.style.overflowY = 'hidden'
    _open = open
    _initHeight = initHeight ? initHeight(window.innerHeight) : window.innerHeight * 0.86
    height = 0

    setTimeout(() => {
      height = _initHeight
    }, 200)
  }

  const destroy = () => {
    height = 50
    setTimeout(() => {
      _open = false
    }, 200)
  }

  onMount(() => {
    if (open) mount()
  })
  onDestroy(destroy)

  $: {
    if (open) mount()
    else destroy()
  }
</script>

{#if _open}
  <div>
    <div
      class={twMerge(
        'bg-white flex flex-col w-full left-0 right-0 bottom-0 z-50 overflow-hidden',
        'will-change-[height] duration-200 ease-out shadow-[4px_4px_16px_0_rgba(51,55,69,0.2)]',
        absolute ? 'absolute' : 'fixed',
        $$props.class
      )}
      style:height={`${height}px`}
    >
      <div class="flex flex-col flex-1 overflow-hidden">
        <slot />
      </div>
    </div>

    <div
      on:click={() => onDismiss()}
      on:keydown={() => {}}
      class={twMerge('bg-black inset-0 z-40', absolute ? 'absolute w-full h-full' : 'fixed w-screen h-screen')}
      style:opacity
    />
  </div>
{/if}
