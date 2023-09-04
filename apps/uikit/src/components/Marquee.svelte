<script lang='ts'>
  import { Marquee } from 'ui'

  const list = [
    'this is for test string1',
    'this is for test string2',
    'this is for test string3',
    'this is for test string4',
  ]

</script>

<Marquee infos={list} class='w-[200px] bg-[#ccc]' />
<br/>
<Marquee infos={list} class='bg-[#ccc]' speed={3} />
<br/>
<div class='flex justify-end'>
  <Marquee infos={list} class='w-[300px] bg-[#ccc] text-[30px]' />
</div>

<br/>
<Marquee infos={list} class='bg-[#ccc]' speed={2} />

<br/>
<Marquee infos={list} class='bg-[#ccc]' speed={4} loop={false} count={2} on:complete={() => console.log('⛔️⛔️⛔️⛔️⛔️ complete!!!') } />
