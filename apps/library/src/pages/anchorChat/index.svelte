<script lang='ts'>
  import { params } from 'svelte-spa-router'

  $: houseId = $params?.anchorHouseId
</script>
<h1>
  anchor chat page
  houseId : {houseId}
</h1>