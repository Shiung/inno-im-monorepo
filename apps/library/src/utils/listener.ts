import { throttle } from 'utils'
import { setDeviceSize } from '$stores'

let handleResize = null

export const regWindowSizeListener = (callbacks?: Array<(e?: Event) => any>) => {
  if (!window) return

  window.removeEventListener('resize', handleResize)

  handleResize = throttle((e: Event) => {
    if (callbacks && callbacks.length) callbacks.forEach(cb => cb(e))
    setDeviceSize()
  }, 250)
  
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}