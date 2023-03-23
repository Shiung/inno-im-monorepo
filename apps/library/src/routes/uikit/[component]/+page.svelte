<script lang='ts'>
import { Button } from 'ui'
import { goto } from '$app/navigation'
import { page } from '$app/stores'

let compName = $page.params.component

const components = {
  button: () => import('./components/Button.svelte'),
  empty: () => import('./components/Empty.svelte'),
}


$: compName = $page.params.component
//@ts-ignore
$: loading = components[compName]()

</script>

{#each Object.entries(components) as [name, loader]}
  <Button on:click={() => goto(`/uikit/${name}`)}> {name} </Button>
{/each}

{#await loading}
  <div> loading </div>
{:then comp}
  <div> {JSON.stringify(comp)} </div>
  <svelte:component this={comp} />
{/await}

