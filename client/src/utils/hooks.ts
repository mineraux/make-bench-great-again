import { useState, useEffect } from 'react'
import { throttle } from './index'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return size
}

interface useScrollSpeedInterface {
  throttleDelay?: number
  setTimeoutDelay?: number
}

export function useScrollSpeed({
  throttleDelay = 50,
  setTimeoutDelay = 200,
}: useScrollSpeedInterface = {}) {
  const [scrollSpeed, setScrollSpeed] = useState(0)

  useEffect(() => {
    let lastPos: number | null
    let newPos: number | null
    let timer: any
    let delta: number = 0

    const clear = () => {
      lastPos = null
      delta = 0
      setScrollSpeed(0)
    }

    const getScrollSpeed = () => {
      newPos = window.scrollY
      if (lastPos != null) {
        // && newPos < maxScroll
        delta = newPos - lastPos
      }
      lastPos = newPos
      clearTimeout(timer)
      timer = setTimeout(clear, setTimeoutDelay)
      return Math.abs(delta)
    }

    const handleScroll = () => {
      setScrollSpeed(getScrollSpeed())
    }

    window.addEventListener('scroll', throttle(throttleDelay, handleScroll))
    return () => {
      window.removeEventListener(
        'scroll',
        throttle(throttleDelay, handleScroll)
      )
    }
  }, [])

  return scrollSpeed
}
