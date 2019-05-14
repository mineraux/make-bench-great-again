import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './splashscreen-animation.scss'
import { observer } from 'mobx-react-lite'
import { TimelineMax } from 'gsap'

type Props = {
  className?: string
  onComplete?: () => any
}

const SplashscreenAnimation: FunctionComponent<Props> = ({ className }) => {
  useEffect(() => {
    const circleTl = new TimelineMax()
  }, [])

  return (
    <div className={Classnames(className, 'splashscreen-animation')}>
      <div className="splashscreen-animation__circle">
        <div className="splashscreen-animation__circle__half-1">
          <p>L'ENVERS</p>
        </div>
        <div className="splashscreen-animation__circle__half-2">
          <p>DU DÉCOR</p>
        </div>
      </div>

      <div className="splashscreen-animation__text-container">
        <p className="splashscreen-animation__text-container__text-1">NUIT</p>

        <p className="splashscreen-animation__text-container__text-2">
          BLANCHE
        </p>
      </div>
    </div>
  )
}

export default observer(SplashscreenAnimation)
