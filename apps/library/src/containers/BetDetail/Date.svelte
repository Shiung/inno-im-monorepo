<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { languagesToDateFormat } from 'utils/convertDateAndTimestamp'
  import { locale } from '$stores'

  export let betItem
</script>

<div class={twMerge('text-[#999]', $$props.class)}>
  {languagesToDateFormat($locale, betItem.betTime)}
</div>
