<script lang="ts">
  import { onMount } from 'svelte';
  import List, { setSid, setGoToExpertDetail, setGoToPlanDetail } from '$src/platform/expert'

  onMount(()=>{
    setSid(1)
    setTimeout(() => {
      setGoToExpertDetail((val: string) => (window.location.href = val))
      setGoToPlanDetail((val: string) => { console.log('plan detail path = ', val) })
    }, 1000)
  })

</script>

<List />