import React, { FunctionComponent, useEffect, useRef } from 'react'
import ClassNames from 'classnames'
// @ts-ignore
import Spritesheet from 'react-responsive-spritesheet'
import './sprite-animation.scss'

import animations from './animations'

type Props = {
  className?: string
  animationID?: string
  progression?: number
  onInstance?: (spriteSheet: any) => void
}

const SpriteAnimation: FunctionComponent<Props> = ({
  className,
  animationID = 'banc-metro',
  progression = 0,
  onInstance,
}) => {
  const { image, widthFrame, heightFrame, steps, fps, loop } = animations[
    animationID
  ]

  const spritesheetInstance = useRef()

  useEffect(() => {
    if (spritesheetInstance.current && progression >= 0) {
      const frame = Math.ceil((steps - 1) * progression)
      // console.log('SpriteAnimation current frame = ', frame)
      // @ts-ignore
      spritesheetInstance.current.goToAndPause(frame)
    }
  }, [progression])

  const getInstance = (spritesheet: any) => {
    spritesheetInstance.current = spritesheet
    if (onInstance) {
      onInstance(spritesheet)
    }
  }

  return (
    <Spritesheet
      className={ClassNames('sprite-animation', className)}
      image={image}
      widthFrame={widthFrame}
      heightFrame={heightFrame}
      steps={steps}
      fps={fps}
      loop={loop}
      getInstance={getInstance}
      autoplay={false}
    />
  )
}

export default SpriteAnimation
