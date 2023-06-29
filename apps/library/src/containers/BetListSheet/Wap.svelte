<script lang="ts">
  import BottomSheet from 'ui/components/BottomSheet'

  export let open: boolean

  const onDismiss = () => (open = false)
</script>

<BottomSheet
  dragBar
  bind:open
  initHeight={(height) => (height * 9) / 10}
  maxHeight={(height) => height}
  {onDismiss}
>
  <slot />
</BottomSheet>
