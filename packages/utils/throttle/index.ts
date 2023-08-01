const throttle = <T extends (...args) => any>(callback: T, wait: number) => {
  let last: number
  let timer: ReturnType<typeof setTimeout>
  
  return function (...args) {
    const context = this as any
    const now = Date.now()

    if(last && now < last + wait) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        callback.apply(context, args)
      }, wait)
    } else {
      last = now
      callback.apply(context, args)
    }
  }
}

export default throttle