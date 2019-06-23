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
import { TimelineMax, Power1, Power2, Bounce } from 'gsap'
import { useWindowSize } from '../../utils/hooks'
import { ReactComponent as DateSvg } from './2019.svg'
import { NavigationStore } from '../../store'
import { themes as scrollIndicationThemes } from '../ScrollIndication/ScrollIndication'

type Props = {
  className?: string
  onComplete?: () => any
}

const SplashscreenAnimation: FunctionComponent<Props> = ({
  className,
  onComplete,
}) => {
  const windowSize = useWindowSize()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const tl = new TimelineMax({
        paused: true,
        onComplete: () => {
          if (ref.current) {
            ref.current.style.overflow = 'initial'
          }
        },
      })

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

      tl
        /* .add("fadeIn", 0)
      fromTo(".splashscreen-animation", 2, {
        opacity: 0,
        filter: "blur(20px)",
      }, {
        opacity: 1,
        filter: "blur(0)",
        autoRound: false
      }, "fadeIn")*/
        .add('part1', 1.5)
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
          circle!,
          2,
          {
            filter: 'blur(25px)',
            autoRound: false,
            ease: Power1.easeOut,
          },
          'part1+=1'
        )
        .to(
          textContainer!,
          1.8,
          {
            filter: 'blur(0)',
            autoRound: false,
            force3D: true,
            ease: Power1.easeOut,
          },
          'part1+=1.5'
        )
        .add(() => {
          NavigationStore.setScrollIndicationTheme(scrollIndicationThemes.Green)
          NavigationStore.setIsScrollIndicationVisible(true)
        }, '+=0.2')
        .add('part2', '+=0.5')
        .add(() => {
          NavigationStore.setIsScrollIndicationVisible(false)
        }, 'part2+=0.1')
        .to(
          circle!,
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
          0.8,
          {
            opacity: 0,
          },
          'part2+=1.7'
        )
        .add(() => {
          NavigationStore.setScrollIndicationTheme(scrollIndicationThemes.Blue)
          NavigationStore.setIsScrollIndicationVisible(true)
        })
        .add(() => {
          if (onComplete) {
            onComplete()
          }
        }, 'part2+=1.5')

      tl.tweenTo('part2')

      const handleTouchStart = () => {
        tl.play()
      }

      ref.current.addEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return (
    <div
      className={Classnames(className, 'splashscreen-animation')}
      style={{
        height: windowSize.height,
      }}
      ref={ref}
    >
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
