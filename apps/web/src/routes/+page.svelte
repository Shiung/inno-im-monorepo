<script lang='ts'>
import '../app.css'
import { onMount } from "svelte"
import { goto } from "$app/navigation"
  
  onMount(() => {
    window.addEventListener("popstate", () => {
      const hash = window.location.hash;
      console.log('========================hash======================', hash)
      if (hash) {
        goto(hash.slice(1))
      }
    })
  })

</script>

<svelte:head>
  <base href="#/" />
</svelte:head>

<button on:click={() => goto("/about")}> goto about </button>
