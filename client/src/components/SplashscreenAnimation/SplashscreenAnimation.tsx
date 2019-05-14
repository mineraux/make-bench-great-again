import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import Classnames from 'classnames'
import './splashscreen-animation.scss'
import { observer } from 'mobx-react-lite'
import { TimelineMax, Power1 } from 'gsap'
import { useWindowSize } from '../../utils/hooks'
import { ReactComponent as DateSvg } from './2019.svg'

type Props = {
  className?: string
  onComplete?: () => any
  children?: ReactNode
}

const SplashscreenAnimation: FunctionComponent<Props> = ({
  className,
  onComplete,
  children,
}) => {
  const windowHeight = useWindowSize().height
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = new TimelineMax({
      delay: 1,
    })

    if (ref.current) {
      const circle = ref.current.querySelector(
        '.splashscreen-animation__circle'
      )
      const circleBlur = ref.current.querySelector(
        '#splashscreen-animation__circle-blur > feGaussianBlur'
      )
      const circleHalf1 = ref.current.querySelector(
        '.splashscreen-animation__circle__half-1'
      )
      const circleHalf2 = ref.current.querySelector(
        '.splashscreen-animation__circle__half-2'
      )
      const textContainer = ref.current.querySelector(
        '.splashscreen-animation__text-container'
      )
      const textContainerBlur = ref.current.querySelector(
        '#splashscreen-animation__text-container-blur > feGaussianBlur'
      )
      const text1 = ref.current.querySelector(
        '.splashscreen-animation__text-container__text-1'
      )
      const text2 = ref.current.querySelector(
        '.splashscreen-animation__text-container__text-2'
      )
      const text3 = ref.current.querySelector(
        '.splashscreen-animation__text-container__text-3'
      )
      tl.add('part1')
        .to(
          [circleHalf1, circleHalf2],
          2,
          {
            opacity: 0,
            ease: Power1.easeInOut,
          },
          'part1'
        )
        .to(
          [circleBlur],
          2,
          {
            attr: { stdDeviation: 25 },
            ease: Power1.easeOut,
          },
          'part1+=1'
        )
        .to(
          [textContainerBlur],
          1.5,
          {
            attr: { stdDeviation: 0 },
            ease: Power1.easeOut,
          },
          'part1+=1.5'
        )
        .add('part2', '+=0.5')
        .to(
          [circle],
          2.5,
          {
            top: '100%',
            ease: Power1.easeInOut,
          },
          'part2'
        )
        .to(
          [text1],
          2.5,
          {
            xPercent: -120,
            ease: Power1.easeInOut,
          },
          'part2+=0'
        )
        .to(
          [text2],
          2.5,
          {
            yPercent: 100,
            ease: Power1.easeInOut,
          },
          'part2+=0'
        )
        .to(
          [text3],
          2.5,
          {
            yPercent: -100,
            ease: Power1.easeInOut,
          },
          'part2+=0'
        )
        .to(
          [text1, text2, text3],
          0.5,
          {
            opacity: 0,
          },
          'part2+=2'
        )
        .add(() => {
          if (onComplete) {
            onComplete()
          }
        }, 'part2+=1.5')
    }
  }, [])

  return (
    <div
      className={Classnames(className, 'splashscreen-animation')}
      style={{
        height: windowHeight,
      }}
      ref={ref}
    >
      <svg className={'splashscreen-animation__circle-blur'}>
        <filter
          id="splashscreen-animation__circle-blur"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
        </filter>
      </svg>

      <svg className={'splashscreen-animation__text-container-blur'}>
        <filter
          id="splashscreen-animation__text-container-blur"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </svg>

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

        <DateSvg className="splashscreen-animation__text-container__text-2" />

        <div className="splashscreen-animation__text-container__text-3">
          <span>B</span>
          <span>L</span>
          <span>A</span>
          <span>N</span>
          <span>C</span>
          <span>H</span>
          <span>E</span>
        </div>
      </div>
    </div>
  )
}

export default observer(SplashscreenAnimation)
