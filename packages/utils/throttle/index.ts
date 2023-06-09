const throttle = (callback, wait) => {
  let last
  let timer
  
  return function () {
    const context = this
    const args = arguments
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