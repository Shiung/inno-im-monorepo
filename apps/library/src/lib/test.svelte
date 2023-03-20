<script lang='ts'>
import Test2 from '$lib/test2.svelte'

let count = 0

const plus = () => {
  count += 1
}

</script>

<div> this is a test svelte library </div>
<button on:click={plus}> plus </button>
<div> {count} </div>

<Test2 />
