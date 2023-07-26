<script lang="ts">
  import { Badget } from 'ui'
</script>

<Badget
  class='flex items-center rounded-tl-[8.5px] rounded-br-[8.5px] space-x-1'
  background='linear-gradient(270deg, #FF508E 0%, #EA4C4C 100%)'
>
  <div class='flex items-end space-x-[1px]'>
    <div class='h-[2px] border border-[#fff] border-t-0 border-b-0 border-r-0'></div>
    <div class='h-[5px] border border-[#fff] border-t-0 border-b-0 border-r-0'></div>
    <div class='h-[3px] border border-[#fff] border-t-0 border-b-0 border-r-0'></div>
  </div>
  <span>LIVE</span>
</Badget>