<script lang="ts">
  const NormalHeader = () => import('./NormalHeader.svelte')
  const TextHeader = () => import('./TextHeader.svelte')

  import { getInfo } from '../context'
  import { headerRect } from '../store'

  export let isTransition: boolean
  export let fixed: boolean = false

  const { header } = getInfo()

  const loadComponent = async (header) => {
    let comp
    switch (header) {
      case 'normal':
      case 'deposit':
        comp = await NormalHeader()
        break
      case 'text':
        comp = await TextHeader()
        break
    }

    return comp.default
  }

  $: promise = loadComponent($header)

  let dom: HTMLDivElement
  $: if (dom) headerRect.set(dom?.getBoundingClientRect())
</script>

<div>
  {#await promise then comp}
    {#if $header === 'normal'}
      <svelte:component this={comp} bind:dom {fixed} {isTransition} showClose on:close />
    {:else if $header === 'text'}
      <svelte:component this={comp} bind:dom />
    {:else if $header === 'deposit'}
      <svelte:component this={comp} bind:dom {fixed} {isTransition} />
    {/if}
  {/await}
</div>
