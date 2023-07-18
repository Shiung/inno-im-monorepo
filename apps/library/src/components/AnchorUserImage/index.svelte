<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import AnchorImage from '$components/AnchorImage'

  export let user: string
  export let type: 'match' | 'deposit'

  export let bg: string = ''

  const fetchDefaultBgByType = async (type) => {
    const img = await import(`./images/${type}.png`)
    bg = img.default
  }

  $: if(!bg) fetchDefaultBgByType(type)
</script>

<div class={twMerge('rounded-[10px] relative', $$props.class)}>
  <div class='absolute left-0 top-0'>
    <slot name='status'></slot>
  </div>

  <img class='block w-full h-auto' src={bg} alt="background">
  
  <AnchorImage class='absolute block bottom-0 left-1/2 -translate-x-[50%] w-1/2' src={user} />
</div>