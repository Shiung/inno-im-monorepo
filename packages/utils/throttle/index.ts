const throttle = (callback: (...args: any[]) => void, wait: number) => {
  let last: number
  let timer: ReturnType<typeof setTimeout>
  
  return function () {
    const context = this as any
    const args = arguments
    const now = Date.now()

    if(last && now < last + wait) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        callback.apply(context, Array.from(args))
      }, wait)
    } else {
      last = now
      callback.apply(context, Array.from(args))
    }
  }
}

export default throttle