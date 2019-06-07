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

export function debounce(callback: (...arg: any) => void, wait: number) {
  let timeout: any
  return (...args: any[]) => {
    // @ts-ignore
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => callback.apply(context, args), wait)
  }
}

export function getHeaderHeight(): any {
  let headerHeight = 0
  const header = document.querySelector('.app__header-container')

  if (header) {
    headerHeight = header.clientHeight
  }

  return headerHeight
}
