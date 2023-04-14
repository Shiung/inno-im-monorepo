<script lang='ts'>
import { push } from 'svelte-spa-router'
import { Button } from 'ui'

import routes from '../routes'
</script>

<div>
  {#each Object.keys(routes) as key}
    <Button class='mr-5 mb-5 w-[150px]' on:click={() => push(key)}> {key} </Button> 
  {/each}
</div>
