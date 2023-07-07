<script lang='ts'>
export let open: boolean
export let height: number
export let maxHeight: number 
export let opacity: number
export let onMaxHeight: () => void

export let closeH: number

let moving: boolean = false
let maxCalled: boolean = false
let startHeight: number

const onTouchStart = () => {
  startHeight = height
  moving = true
}

const onTouchMove = (e: TouchEvent) => {
  if (!moving) return

  height = window.innerHeight - e.targetTouches[0].clientY
}

const onTouchEnd = () => {
  moving = false
  if (height <= closeH) {
    setTimeout(() => {
      open = false
    }, 200)
  }
  if (height >= maxHeight) {
    height = maxHeight
    if (!maxCalled) {
      onMaxHeight()
      maxCalled = true
    }
  }
}

$: if (height > startHeight + 10) height = maxHeight

</script>

<svelte:window on:touchmove={onTouchMove} on:touchend={onTouchEnd} />

<div class='w-full flex justify-center items-center min-h-[20px] max-h-[20px] will-change-[opacity]' style:opacity={opacity}>
  <div class='flex items-center h-[40px]' on:touchstart={onTouchStart}>
    <div class='w-[80px] h-[4px] bg-[#BBBBBB] rounded-[2px]' />
  </div>
</div>
