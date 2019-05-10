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
