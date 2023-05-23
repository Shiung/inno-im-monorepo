<script lang='ts'>
import { getContext } from './context'

let { a, b } = getContext()

</script>

<div id='innerA'> {$a} </div>
<div id='innerB'> {$b} </div>
