<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { dismiss } from './directive'

  export let minimizeSideLen: number = 52
  export let right: number = 9
  export let mask: boolean = false

  let dom: HTMLDivElement
  let expand: boolean = false
  let transitionComplete: boolean = false
  let width: string,
    height: string = `${minimizeSideLen}px`

  const handleClick = () => {
    expand = !expand

    transitionComplete = true

    dom.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.propertyName !== 'width') return
      transitionComplete = false
    })
  }

  $: width = expand ? `${window.innerWidth - right * 2}px` : `${minimizeSideLen}px`
</script>

<div>
  <div
    class={twMerge(`fixed bottom-[107px] right-[${right}px] duration-[300ms] ease-linear z-50`, $$props.class)}
    style:width
    style:height
    use:dismiss
    on:dismiss={() => (expand = false)}
    on:click={handleClick}
    on:keypress
    bind:this={dom}
  >
    <div class="w-full h-full absolute right-0 duration-[300ms] ease-out" style:opacity={!expand && !transitionComplete ? '1' : '0'}>
      <slot name="minimize" />
    </div>

    <div
      class="w-full h-full absolute right-0 duration-[300ms] ease-linear rounded-[16px] bg-white im-shadow"
      style:opacity={expand ? '1' : '0'}
    >
      <slot name="expand" />
    </div>
  </div>

  {#if expand && mask}
    <div class="bg-black fixed h-screen w-screen inset-0 z-40 opacity-0" />
  {/if}
</div>
