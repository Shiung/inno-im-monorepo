<script lang='ts'>
import Base from './base.svelte'
export let text: string = ''
export let loading: boolean = false
</script>

<Base {...$$props} {loading}> {text} </Base>


