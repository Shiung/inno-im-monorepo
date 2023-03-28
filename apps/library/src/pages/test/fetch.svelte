<script lang='ts'>
import { onMount } from 'svelte'
import { echo } from 'api'

onMount(async() => {
  const res = await echo.users({
    params: { aa: 'asffd', bb: 'aaaaaaaaaaaaaaa' },
    headers: { auto: 'auto1244' },
    body: { a: 123 },
  })

  console.log(res)
})


</script>

<div> this is fetch </div>
