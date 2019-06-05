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

export const mapRange = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
): number => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
