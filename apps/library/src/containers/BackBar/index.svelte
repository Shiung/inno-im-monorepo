<script lang='ts'>
import { isLg } from '$stores'
import Pc from './Pc.svelte'
import Wap from './Wap.svelte'

export let title: string = ''

</script>

<div data-cid="BackBar">
  <svelte:component this={$isLg? Pc : Wap} {title}>
    <slot slot="right" />
  </svelte:component>
</div>
