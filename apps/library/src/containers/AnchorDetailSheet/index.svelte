<script lang='ts'>
  import Pc from './Pc.svelte'
  import Wap from './Wap.svelte'
  import { isLg } from '$stores'

  export let open: boolean
  export let houseId: string

  $: comp =  $isLg ? Pc : Wap
  
</script>

<svelte:component this={comp} bind:open {houseId} />
