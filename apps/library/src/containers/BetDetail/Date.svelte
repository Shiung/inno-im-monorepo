<script lang="ts">
  import { languagesToDateFormat } from 'utils/convertDateAndTimestamp'
  import { locale } from '$stores'

  export let betItem

</script>

<div class="text-[#999]">
  {languagesToDateFormat($locale, betItem.betTime)}
</div>
