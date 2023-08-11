<script lang="ts">
  import { t } from '$stores'

  export let titleKey: string
</script>

<div class='px-[12px] pt-[12px]'>
  <h1 class='text-[16px] text-[#333]'>{$t(titleKey)}</h1>
</div>