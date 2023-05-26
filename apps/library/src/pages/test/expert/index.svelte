<script lang="ts">
  import { onMount } from 'svelte';
  import List, { setSid, setGoToDetail } from '$src/platform/expert'

  onMount(()=>{
    setSid("1")
    setTimeout(() => {
      setGoToDetail((val: string) => (window.location.href = val))
    }, 1000)
  })

</script>

<List />