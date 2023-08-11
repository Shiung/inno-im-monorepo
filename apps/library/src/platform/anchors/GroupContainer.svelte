<script lang='ts'>
  import { list } from '../store'

  export let houseId: string = ''


  $: store = list.get(houseId)
</script>


<slot store={$store} />

