function debounce<T extends (...args: any[]) => any>(fn: T, timeout: number) {
  let timer: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
    const context = this as any
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(context, args)
    }, timeout)
  } as T
}

export default debounce