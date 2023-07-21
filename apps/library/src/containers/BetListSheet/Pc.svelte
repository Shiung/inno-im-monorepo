<script lang="ts">
  import Dialog from 'ui/components/Dialog/index.svelte'
  import { chatEnv } from '../Chatroom/controller'
  export let open: boolean

  const onDismiss = () => (open = false)
  
  $: absolute = $chatEnv.device === 'pc'
</script>

<Dialog
  class={'rounded-[10px] w-[95%] bottom-[75px] left-[2.5%]'}
  bind:open
  initHeight={(height) => height * 0.5}
  {absolute} 
  {onDismiss}
>
  <slot />
</Dialog>
