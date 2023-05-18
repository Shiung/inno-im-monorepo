<script lang='ts'>
import bonusPoint from '../images/bonusPoint.webp'
import { amountThousandthTransformer } from 'utils/amount'

export let bonus: number = 0

</script>

<div class='relative flex items-center h-[20px] rounded-[15px] overflow-hidden px-[6px]'>
  <div class='absolute inset-0 bg-imprimary z-[-1] opacity-10' />
  <img class='w-[12px] h-[12px] mr-[6px]' src={bonusPoint} alt='' />
  <div class='text-[#333333] text-[11px]'> {amountThousandthTransformer(bonus)} </div>
</div>
