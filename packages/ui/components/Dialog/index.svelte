<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  export let open: boolean = false
  export let initHeight: (innerHeight: number) => number
  export let onDismiss: () => void = () => {}

  let _open: boolean = open
  let height: number
  let _initHeight: number

  const mount = () => {
    const html = document.getElementsByTagName('html')[0]
    html.style.overflowY = 'hidden'
    _open = open
    _initHeight = initHeight ? initHeight(window.innerHeight) : (window.innerHeight / 4) * 3
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
        'bg-white flex flex-col w-full fixed left-0 right-0 bottom-0 z-50 overflow-hidden will-change-[height] duration-200 ease-out',
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
      class="bg-black fixed h-screen w-screen inset-0 z-40 opacity-[0.4]"
    />
  </div>
{/if}
