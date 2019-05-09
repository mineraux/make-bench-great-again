import React, { FunctionComponent, useEffect, useRef } from 'react'
import ClassNames from 'classnames'
import { TweenMax } from 'gsap'
import './progress-bar.scss'

type Props = {
  className?: string
  progression: number
}

const ProgressBar: FunctionComponent<Props> = ({ className, progression }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current, 0.5, {
        scaleX: progression,
      })
    }
  }, [progression])

  return <div ref={ref} className={ClassNames('progress-bar', className)} />
}

export default ProgressBar
