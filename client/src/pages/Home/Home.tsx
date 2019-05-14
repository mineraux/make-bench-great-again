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
import { useScrollSpeed } from '../../utils/hooks'
// styles
import './home.scss'
import SplashscreenAnimation from '../../components/SplashscreenAnimation/SplashscreenAnimation'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ match }) => {
  const scrollSpeed = useScrollSpeed()
  const [isSplashscreenCompleted, setIsSplashscreenCompleted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const minDelta = 0
    const maxDelta = 20

    if (scrollSpeed !== null) {
      const clampedDelta = Math.max(minDelta, Math.min(scrollSpeed, maxDelta))
      const normalizedDelta = (clampedDelta - minDelta) / (maxDelta - minDelta)
      if (ref && ref.current) {
        console.log(normalizedDelta)
        ref.current.style.filter = `blur(${normalizedDelta * 0.12}rem)`
      }
    }
  }, [scrollSpeed])

  const handleSplashscreenComplete = () => {
    setIsSplashscreenCompleted(true)
  }

  return (
    <div className={'page-home'} ref={ref}>
      {!isSplashscreenCompleted ? (
        <SplashscreenAnimation onComplete={handleSplashscreenComplete} />
      ) : (
        <Fragment>
          <div className="page-home__container-1">
            <p className="page-home__container-1__title">
              UNE EXPERIENCE
              <br />
              INTERACTIVE
            </p>
            <p className="page-home__container-1__text">
              L’envers du décors vous propose un parcours conçu sous forme de
              séries de performances.
            </p>
            <p className="page-home__container-1__text">
              Il s’agit de donner une place nouvelle aux talents émergents qui
              investissent l’espace public, en proposant une déambulation
              visuelle l’instant d’une nuit.
            </p>
          </div>

          <div className="page-home__container-2">
            <p className="page-home__container-2__title">
              COMMENT PARTICIPER ?
            </p>
            <p className="page-home__container-2__text">
              Pour prendre part à l’événement, vous serez amené à réaliser des
              actions simples autour des installations
            </p>
            <p className="page-home__container-2__text">
              Pour profiter pleinement de l’expérience,laissez-vous guider par
              notre carte interactive.
            </p>
            <Button
              className={'page-home__container-2__button'}
              label={'Commencer'}
              theme={buttonThemes.Green}
              link={config.routes.Map.path}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Home
