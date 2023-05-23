<script lang='ts'>
import Inner  from './inner.test.svelte'

import { setContext } from './context'

export let a: number
export let b: number

const { a: _a, b: _b } = setContext({ a, b })

</script>

<div id='a'> {$_a} </div>
<div id='b'> {$_b} </div>

<Inner />
