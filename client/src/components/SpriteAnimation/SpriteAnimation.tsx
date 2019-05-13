import React, {
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
  useRef,
} from 'react'
import ClassNames from 'classnames'
// @ts-ignore
import Spritesheet from 'react-responsive-spritesheet'
import './sprite-animation.scss'

import sprite from './spritesheet.png'

type Props = {
  className?: string
  animationID?: string
  progression?: number
}

const SpriteAnimation: FunctionComponent<Props> = ({
  className,
  animationID = 'spritesheet',
  progression = 0,
}) => {
  const [p, setP] = useState<number>(0)

  const spritesheetInstance = useRef()

  // const sprite = require(`./${animationID}.png`)

  useEffect(() => {
    if (spritesheetInstance.current && progression >= 0) {
      const frame = Math.floor((76 - 1) * p)
      console.log(frame)
      // @ts-ignore
      spritesheetInstance.current.goToAndPause(frame)
    }
  }, [p])

  const getInstance = (spritesheet: any) => {
    spritesheetInstance.current = spritesheet
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setP(Number(e.target.value))
  }

  return (
    <Fragment>
      <Spritesheet
        className={ClassNames('sprite-animation')}
        image={sprite}
        widthFrame={750}
        heightFrame={671}
        steps={76}
        fps={25}
        loop={true}
        getInstance={getInstance}
      />
      <input
        className={'sprite-animation__input'}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={p}
        onChange={handleInputChange}
      />
    </Fragment>
  )
}

export default SpriteAnimation
