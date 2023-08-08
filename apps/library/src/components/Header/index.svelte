<script lang="ts">
  import { twMerge } from "tailwind-merge"
  import VendorLogo from '../VendorLogo'

</script>

<div class={twMerge('flex justify-between items-center bg-white im-shadow rounded-b-[20px] h-[44px]', $$props.class)}>
  <div>
    <slot name='left'>
      <VendorLogo class='pl-3 h-[26px] w-auto' />
    </slot>
  </div>

  <div>
    <slot name='middle'></slot>
  </div>

  <div>
    <slot name='right'></slot>
  </div>
</div>
