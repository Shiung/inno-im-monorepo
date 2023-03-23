<script lang='ts'>
import { onMount } from 'svelte'
import { echo } from 'api'

onMount(async() => {
  const res = await echo.test({
    params: { aa: 'asffd', bb: 'aaaaaaaaaaaaaaa' },
    method: 'post',
    headers: { auto: 'auto1244' },
    body: { a: 123 },
  })

  console.log(res)
})


</script>

<div> this is test2 </div>
