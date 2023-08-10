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

<div class={twMerge('rounded-[10px] relative overflow-hidden', $$props.class)}>

  <img class='block w-full h-auto' src={bg} alt="background">

  <AnchorImage class='absolute block top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] w-[30%] border-imprimary' src={user} />
</div>