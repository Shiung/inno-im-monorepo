const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout>
  
  return function () {
    const context = this as any
    const args = arguments

    clearTimeout(timer)

    timer = setTimeout(() => {
      callback.apply(context, args)
    }, wait)
  }
}

export default debounce
