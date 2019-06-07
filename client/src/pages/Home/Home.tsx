import React, {
  FunctionComponent,
  Fragment,
  useEffect,
  useState,
  useRef,
} from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { useScrollSpeed, useWindowSize, useClientRect } from '../../utils/hooks'
import { getHeaderHeight } from '../../utils'
import ScrollMagicController from './ScrollMagicController'

import SplashscreenAnimation from '../../components/SplashscreenAnimation/SplashscreenAnimation'
import { NavigationStore } from '../../store'
import { TimelineMax, TweenMax, Power1, Power2 } from 'gsap'
// styles
import './home.scss'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ match }) => {
  const scrollSpeed = useScrollSpeed()
  const [isSplashscreenCompleted, setIsSplashscreenCompleted] = useState(false)
  const [isTextReady, setIsTextReady] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { setIsHeaderVisible } = NavigationStore
  const windowHeight = useWindowSize().height
  const refContainer = useRef<HTMLDivElement>(null)

  let xDown: number
  let yDown: number

  useEffect(() => {
    return () => {
      ScrollMagicController.destroyScrollMagicScenes()
    }
  }, [])

  useEffect(() => {
    if (isSplashscreenCompleted) {
      ScrollMagicController.initController()
      if (ref.current) {
        const containers = ref.current.querySelectorAll(
          '.page-home__containers-wrapper__title, .page-home__containers-wrapper__container-1, .page-home__containers-wrapper__container-2'
        )

        const tl = new TimelineMax({
          onComplete: () => {
            setIsTextReady(true)
          },
        })

        tl.to(
          containers,
          1.5,
          {
            filter: 'blur(0rem)',
            autoRound: false,
            ease: Power2.easeOut,
          },
          0
        ).to(
          [
            '.page-home__containers-wrapper__title',
            '.page-home__containers-wrapper__container-1',
          ],
          1,
          {
            opacity: 1,
          },
          0
        )
      }
      // if (ref.current) {
      //   ref.current.addEventListener('touchstart', handleTouchStart, false)
      //   ref.current.addEventListener('touchmove', handleTouchMove, false)
      // }
    }
  }, [isSplashscreenCompleted])

  const getTouches = (evt: TouchEvent) => {
    return evt.touches
  }

  const handleTouchStart = (evt: TouchEvent) => {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  const handleTouchMove = (evt: TouchEvent) => {
    if (!xDown || !yDown) {
      return
    }

    let xUp = evt.touches[0].clientX
    let yUp = evt.touches[0].clientY

    let xDiff = xDown - xUp
    let yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      const animationDuration = 1.5
      if (ref.current) {
        // const containers = ref.current.querySelectorAll(
        //   '.page-home__containers-wrapper__container-1, .page-home__containers-wrapper__container-2'
        // )

        if (ref && ref.current) {
          TweenMax.to('.page-home__containers-wrapper', animationDuration / 2, {
            autoRound: false,
            filter: `blur(1px)`,
            onComplete: () => {
              TweenMax.to(
                '.page-home__containers-wrapper',
                animationDuration / 2,
                {
                  autoRound: false,
                  filter: `blur(0)`,
                }
              )
            },
          })
        }
      }

      if (yDiff > 0) {
        /* up swipe */
        TweenMax.to('.page-home__containers-wrapper', animationDuration, {
          y: -refContainer.current!.clientHeight,
        })
      } else {
        /* down swipe */
        // window.scrollTo(0, 0) // for safari top bar
        TweenMax.to('.page-home__containers-wrapper', animationDuration, {
          y: 0,
        })
      }
    }

    /* reset values */
    xDown
    yDown
  }

  const handleSplashscreenComplete = () => {
    setIsSplashscreenCompleted(true)
  }

  return (
    <div className={'page-home'} ref={ref}>
      <SplashscreenAnimation onComplete={handleSplashscreenComplete} />

      {isSplashscreenCompleted && (
        <div className="page-home__containers-wrapper">
          <h2 className="page-home__containers-wrapper__title">
            L'envers <br /> du décor
          </h2>
          <div
            className="page-home__containers-wrapper__container-1"
            style={{ height: windowHeight }}
          >
            <p className="page-home__containers-wrapper__container-1__title">
              UNE EXPERIENCE
              <br />
              INTERACTIVE
            </p>
            <p className="page-home__containers-wrapper__container-1__text">
              L’envers du décors vous propose un parcours conçu sous forme de
              séries de performances.
            </p>
            <p className="page-home__containers-wrapper__container-1__text">
              Il s’agit de donner une place nouvelle aux talents émergents qui
              investissent l’espace public, en proposant une déambulation
              visuelle l’instant d’une nuit.
            </p>
          </div>

          <div
            ref={refContainer}
            className="page-home__containers-wrapper__container-2"
            style={{ height: windowHeight }}
          >
            <p className="page-home__containers-wrapper__container-2__title">
              COMMENT PARTICIPER ?
            </p>
            <p className="page-home__containers-wrapper__container-2__text">
              Pour prendre part à l’événement, vous serez amené à réaliser des
              actions simples autour des installations
            </p>
            <p className="page-home__containers-wrapper__container-2__text">
              Pour profiter pleinement de l’expérience,laissez-vous guider par
              notre carte interactive.
            </p>
            <Button
              className={'page-home__containers-wrapper__container-2__button'}
              label={'Commencer'}
              theme={buttonThemes.Green}
              link={config.routes.Map.path}
              onClick={() => setIsHeaderVisible(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
