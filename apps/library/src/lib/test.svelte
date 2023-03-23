<script lang='ts'>
import Test2 from './test2.svelte'

let count = 0

const plus = () => {
  count += 1
}

</script>

<div class='text-sky-400'> this is a test svelte library </div>
<button on:click={plus}> plus </button>
<div> {count} </div>

<Test2 />
