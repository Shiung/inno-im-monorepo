<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import AnchorImage from '$containers/AnchorImage'
  import { Badget } from 'ui'

  export let user: string
  export let type: 'match' | 'deposit'
  export let isLive: boolean

  export let bg: string = ''

  const fetchDefaultBgByType = async (type) => {
    const img = await import(`./images/${type}.png`)
    bg = img.default
  }

  $: if(!bg) fetchDefaultBgByType(type)
</script>

<div class={twMerge('rounded-[10px] relative', $$props.class)}>
  {#if isLive}
    <div class='absolute left-0 top-0 z-10'>
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
    </div>
  {/if}

  <img class='block w-auto h-[81px]' src={bg} alt="background">
  
  <AnchorImage class='absolute block bottom-0 left-1/2 -translate-x-[50%] w-1/2' src={user} />
</div>