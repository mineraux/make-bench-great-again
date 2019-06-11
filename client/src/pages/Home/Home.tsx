import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { themes as scrollIndicationThemes } from '../../components/ScrollIndication/ScrollIndication'
import { useWindowSize } from '../../utils/hooks'
import ScrollMagicController from './ScrollMagicController'
import SplashscreenAnimation from '../../components/SplashscreenAnimation/SplashscreenAnimation'
import { NavigationStore } from '../../store'
import { TimelineMax, Power1, Power2 } from 'gsap'

// styles
import './home.scss'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ match }) => {
  const [isSplashscreenCompleted, setIsSplashscreenCompleted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const {
    setIsHeaderVisible,
    setScrollIndicationTheme,
    setIsScrollIndicationVisible,
    setIsScrollIndicationTextVisible,
  } = NavigationStore
  const windowHeight = useWindowSize().height
  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsHeaderVisible(false)
    setScrollIndicationTheme(scrollIndicationThemes.Blue)
    setIsScrollIndicationVisible(false)
    setIsScrollIndicationTextVisible(true)
    return () => {
      ScrollMagicController.destroyScrollMagicScenes()
    }
  }, [])

  useEffect(() => {
    if (isSplashscreenCompleted) {
      ScrollMagicController.initController()
      if (ref.current) {
        const tl = new TimelineMax()

        tl.fromTo(
          '.page-home__containers-wrapper',
          1.5,
          {
            filter: 'blur(4px)',
            opacity: 0,
          },
          {
            filter: 'blur(0)',
            opacity: 1,
            autoRound: false,
            ease: Power1.easeOut,
          }
        ).add(() => {
          NavigationStore.setIsScrollIndicationVisible(true)
        }, '-=0.5')
      }
    }
  }, [isSplashscreenCompleted])

  const handleSplashscreenComplete = () => {
    setIsSplashscreenCompleted(true)
  }

  const handleOnClickButton = () => {
    setIsHeaderVisible(true)
  }

  return (
    <div className={'page-home'} ref={ref}>
      <SplashscreenAnimation onComplete={handleSplashscreenComplete} />

      {isSplashscreenCompleted && (
        <div
          className="page-home__containers-wrapper"
          style={{ height: windowHeight }}
        >
          <h2 className="page-home__containers-wrapper__title">
            L'envers
            <br />
            du décor
          </h2>
          <div className="page-home__containers-wrapper__container-1">
            <p className="page-home__containers-wrapper__container-1__title">
              Une expérience
              <br />
              interactive
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
              Pour profiter pleinement de l’expérience, laissez-vous guider par
              notre carte interactive.
            </p>
            <Button
              className={'page-home__containers-wrapper__container-2__button'}
              label={'Commencer'}
              theme={buttonThemes.Green}
              link={config.routes.Map.path}
              onClick={handleOnClickButton}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
