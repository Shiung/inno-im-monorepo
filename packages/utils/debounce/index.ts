const debounce = <T extends (...args: any[]) => any>(callback: T, wait: number) => {
  let timer: ReturnType<typeof setTimeout>
  
  return function (...args: any[]) {
    const context = this as any

    clearTimeout(timer)

    timer = setTimeout(() => {
      callback.apply(context, args)
    }, wait)
  } as T
}

export default debounce
