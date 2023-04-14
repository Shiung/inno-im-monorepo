<script lang='ts'>
import { Search } from 'ui'

let dict = [
  'a1', 'b1', 'c1', 'd1',
  'a2', 'b2', 'c2', 'd2',
  'a3', 'b3', 'c3', 'd3',
  'a4', 'b4', 'c4', 'd4',
  'a5', 'b5', 'c5', 'd5',
  'a6', 'b6', 'c6', 'd6',
  'a7', 'b7', 'c7', 'd7',
  'a8', 'b8', 'c8', 'd8',
  'a9', 'b9', 'c9', 'd9',
  'a10', 'b10', 'c10', 'd10',
  'a11', 'b11', 'c11', 'd11',
  'a12', 'b12', 'c12', 'd12',
]

let value: string = undefined

</script>

<div class='px-[50px]'>
  <Search placeholder='this is placeholder' dict={dict} bind:value={value} on:select={(e) => console.log(e.detail)} />
  <div> {value || ''} </div>
</div>
