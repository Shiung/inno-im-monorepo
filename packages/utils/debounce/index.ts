function debounce<T extends (...args) => any>(fn: T, timeout) {
  let timer

  return function (...args) {
    const context = this as any
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, timeout)
  } as T
}

export default debounce