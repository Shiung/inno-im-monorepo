<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import AnchorImage from '$containers/AnchorImage'

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

  <img class='block w-auto h-[81px]' src={bg} alt="background">

  <AnchorImage class='absolute block bottom-0 left-1/2 -translate-x-[50%] w-1/2' src={user} />
</div>