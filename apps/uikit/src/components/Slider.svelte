<script lang="ts">
  import { Slider } from 'ui'

  const testData = Array.from({ length: 3 }).map((_, idx) => ({ key: idx, title: `slider ${idx}`}))

  const testData2 = Array.from({ length: 1 }).map((_, idx) => ({ key: idx, title: `slider ${idx}`}))

  const colors = {
    0: 'red',
    1: 'blue',
    2: 'green'
  }
</script>

<div class="max-w-[375px] mx-auto mt-[100px] border border-black rounded-lg">
  <h2 class='text-[30px] font-bold'>normal slider</h2>
  <Slider data={testData} height={80} let:item={item}>
    <div class="flex items-center justify-center bg-green-300 border border-black h-full p-4" style:background-color={colors[item.key]}>
      <span>{item.title}</span>
    </div>
  </Slider>

  <h2 class='text-[30px] font-bold'>slider with 1 slide</h2>
  <Slider data={testData2} height={80} width='50%' let:item={item} needSlide={testData2.length > 1}>
    <div class="flex items-center justify-center bg-green-300 border border-black h-full p-4">
      <span>{item.title}</span>
    </div>
  </Slider>
</div>