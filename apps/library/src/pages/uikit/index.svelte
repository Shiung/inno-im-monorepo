<script lang='ts'>
import { Button } from 'ui'
import list from './list'

let compName = 'empty'

$: loading = list[compName]()

</script>

<div>
  {#each Object.keys(list) as name}
    <Button class='mr-5' on:click={() => { compName = name } }> {name} </Button>
  {/each}

  <div class='my-5 h-1 w-full bg-gray-200' />

  <div>
    {#await loading}
      <div> loading... </div>
    {:then comp}
      <svelte:component this={comp.default} />
    {/await}
  </div>
</div>
