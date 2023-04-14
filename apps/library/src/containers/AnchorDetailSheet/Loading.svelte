<script lang='ts'>
</script>

<div class='flex flex-col items-center'>
  <div class='animate-pulse bg-[#eeeeee] rounded-full h-[160px] w-[160px] mb-[15px]' />
  <div class='animate-pulse bg-[#eeeeee] h-[25px] w-[100px] mb-[5px]' />
  <div class='animate-pulse bg-[#eeeeee] h-[20px] w-[300px] mb-[20px]' />

  <div class='flex justify-around h-[30px] w-full'>
    {#each { length: 3 } as _}
      <div class='animate-pulse bg-[#eeeeee] h-full w-[80px] rounded-[20px]' />
    {/each}
  </div>

  <div class='w-full space-y-[12px] mt-[20px] px-[20px]'>
  {#each { length: 3 } as _}
    <div class='animate-pulse bg-[#eeeeee] h-[95px] rounded-[16px]' />
  {/each}
  </div>
</div>
