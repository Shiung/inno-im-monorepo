<script lang='ts'>
import Anchor from './Anchor'
import { fetchArchors } from '../service'

const archorsPromise = fetchArchors()

</script>

<div>
 anchor
  {#await archorsPromise}
    <div> loading... </div>
  {:then anchors}
    {#each anchors?.list as anchor}

      <Anchor anchor={anchor} />

    {/each}
  {/await}
</div>
