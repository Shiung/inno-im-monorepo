<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { Ripple } from 'ui'
  import { t } from '$stores'

  export let activedTab: (typeof tabs)[number]
  export let tabs: string[]
</script>

<div class="flex justify-between text-[16px] lg:text-[14px]">
  {#each tabs as tab}
    <div
      class="flex justify-center items-center duration-300 rounded-[10px] max-w-[45%]"
      style:background-color={activedTab === tab ? 'rgb(var(--im-monorepo-primary))' : '#eeeeee'}
    >
      <Ripple
        class={twMerge(
          'text-[#333333] h-[32px] w-[164px]',
          activedTab === tab && 'text-white font-semibold'
        )}
        ripple="#ffffff"
        on:click={() => (activedTab = tab)}
      >
        {$t(tab)}
      </Ripple>
    </div>
  {/each}
</div>
