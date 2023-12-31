<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import Draggable from './Draggable.svelte'
  import DragBar from './DragBar.svelte'

  export let open: boolean = false
  export let draggable: boolean = false
  export let initHeight: (innerHeight: number) => number
  export let maxHeight: (innerHeight: number) => number
  export let onDismiss: () => void = () => {}

  export let onMaxHeight: (onMax: boolean) => void = () => {}

  let _open: boolean = open
  let contentOpacity: number = 1
  let height: number
  let _initHeight: number
  let _maxHeight: number

  const mount = () => {
    const html = document.getElementsByTagName('html')[0]
    html.style.overflowY = 'hidden'
    _open = open
    _maxHeight = maxHeight ? maxHeight(window.innerHeight) : window.innerHeight * 0.86
    _initHeight = initHeight ? initHeight(window.innerHeight) : _maxHeight
    height = 0

    setTimeout(() => {
      height = _initHeight
    }, 200)
  }

  const destroy = () => {
    const html = document.getElementsByTagName('html')[0]
    html.style.overflowY = null
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

  $: _opacity = height >= _maxHeight ? 0.8 : (height / _maxHeight) * 0.8

  const fadeH = 150
  const transparentH = 80

  $: {
    if (height >= fadeH) contentOpacity = 1
    else if (height <= transparentH) contentOpacity = 0
    else contentOpacity = (height - transparentH) / (fadeH - transparentH)
  }
</script>

{#if _open}
  <div data-cid="BottomSheet_Container">
    <Draggable
      class={twMerge('bg-white rounded-t-[30px]', $$props.class, 'flex flex-col w-full fixed left-0 right-0 bottom-0 z-50 overflow-hidden')}
      bind:open
      bind:height
      isDisabled={!draggable}
      initHeight={_initHeight}
      maxHeight={_maxHeight}
      closeH={fadeH}
      {onMaxHeight}
    >
      {#if draggable}
        <DragBar opacity={contentOpacity} />
      {/if}

      <div class="flex flex-col flex-1 will-change-[opacity] overflow-hidden" style:opacity={contentOpacity}>
        <slot />
      </div>
    </Draggable>

    <div
      on:click={() => onDismiss()}
      on:keydown={() => {}}
      class="bg-black fixed h-screen w-screen inset-0 z-40 will-change-[opacity]"
      style:opacity={_opacity}
    />
  </div>
{/if}
