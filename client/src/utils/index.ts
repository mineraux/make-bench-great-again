export const throttle = (delay: number, fn: (...arg: any) => any) => {
  let lastCall = 0
  return (...args: any[]) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
}

export function debounce(callback: (...arg: any) => void, wait: number) {
  let timeout: any
  return (...args: any[]) => {
    // @ts-ignore
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => callback.apply(context, args), wait)
  }
}
