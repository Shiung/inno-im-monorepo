<script lang='ts'>
  import { twMerge } from 'tailwind-merge';
  import { Ripple } from 'ui'
  export let active: boolean = true

</script>

<div class='shadow-[0_0_20px_0_rgba(0,0,0,.1)] rounded-[12px]'>
  <Ripple
    class={twMerge('w-[146px] h-[70px] rounded-[12px] shrink-0 cursor-point', active && 'pointer-events-none')}
    on:click>
    <div
      class='w-full h-full p-[3px]'
      style:background={ active ? 'linear-gradient(90deg, rgb(var(--im-monorepo-primary)) 0%, rgb(var(--im-monorepo-secondary)) 100%)' : '#fff' }>
      <div class='w-full h-full flex bg-white rounded-[10px] flex items-center px-[5px]'>
        <div class='flex-[0_0_50px] flex justify-center'>
          <slot name='image' />
        </div>
        <div class='pl-[5px] py-[5px] flex-1 flex flex-col overflow-hidden h-full'>
          <div class='flex-1 flex items-center'>
            <div class='truncate text-[#333] text-[12px] '>
              <slot name='username'>
                <span data-id='missing-name' />
              </slot>
            </div>
          </div>
          <div class='flex-1 flex items-center'>
            <slot name='flag'>
              <span data-id='missing-flag' />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Ripple>
</div>
