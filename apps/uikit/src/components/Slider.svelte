<script lang="ts">
  import { Slider } from 'ui'

  const testData = Array.from({ length: 3 }).map((_, idx) => ({ key: idx, title: `slider ${idx}`}))
</script>

<div class="max-w-[375px] mx-auto mt-[300px] border border-black rounded-lg">
  <Slider data={testData} height={80} let:item={item}>
    <div class="flex items-center justify-center bg-green-300 border border-black h-full p-4">
      <span>{item.title}</span>
    </div>
  </Slider>
</div>