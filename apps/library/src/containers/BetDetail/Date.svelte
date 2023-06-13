<script lang="ts">
  import { languagesToDateFormat } from 'utils/convertDateAndTimestamp'
  import { getInfo } from '../Chatroom/context'

  export let betItem

  const { language } = getInfo()
</script>

<div class="text-[#999]">
  {languagesToDateFormat($language, betItem.betTime)}
</div>
