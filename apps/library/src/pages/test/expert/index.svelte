<script lang="ts">
  import { onMount } from 'svelte';
  import List, { setMatchInfo, setGoToExpertDetail, setGoToPlanDetail } from '$src/platform/expert'

  onMount(()=>{
    setMatchInfo({ mid: 9470239, vd: 'a' })
    setTimeout(() => {
      setGoToExpertDetail((val: string) => (window.location.href = val))
      setGoToPlanDetail((val: string) => { console.log('plan detail path = ', val) })
    }, 1000)
  })

</script>

<List />