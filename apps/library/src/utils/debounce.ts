function debounce<T>(fn: T, timeout) {
  let timer

  return function (...args) {
    const context = this
    clearTimeout(timer)

    timer = setTimeout(() => {
      typeof fn === 'function' && fn.apply(context, args)
    }, timeout)
  } as T
}

export default debounce