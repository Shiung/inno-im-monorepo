<script lang='ts'>
import { onMount } from 'svelte' 

export let value: string
export let duration: number = 1000

let _value = value
$: _value = String(value)

let rafId: number

onMount(() => {
  let startTimestamp: number
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp

    const random = String(Math.random()).slice(2)
    _value = _value.replace(/(\d)/g, (_match, _p1, offset) => random[offset % random.length])
    
    const _duration = timestamp - startTimestamp
    if (duration > _duration) {
      rafId = window.requestAnimationFrame(step)
    } else {
      _value = value
    }
  }

  rafId = window.requestAnimationFrame(step)
  
  return () => window.cancelAnimationFrame(rafId)
})

</script>

<span> {_value} </span>
