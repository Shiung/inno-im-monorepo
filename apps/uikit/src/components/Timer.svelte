<script lang="ts">
  import { onMount } from 'svelte'
  import Timer from 'utils/timer'

  const timer = new Timer({ start: Date.now(), end: Date.now() + 10 * 1000 })

  onMount(() => {
    timer.start()

    setTimeout(() => {
      for(let i = 0; i < 1000000000; i++) {}
    }, 3000)
  })
</script>