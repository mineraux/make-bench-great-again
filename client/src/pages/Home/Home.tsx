import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import config from '../../config/config'
import { throttle } from '../../utils'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
// styles
import './home.scss'

type Props = pageProps

const minDelta = 0
const maxDelta = 20

const Home: FunctionComponent<Props> = ({ show }) => {
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollSpeed !== null) {
      const clampedDelta = Math.max(minDelta, Math.min(scrollSpeed, maxDelta))
      const normalizedDelta = (clampedDelta - minDelta) / (maxDelta - minDelta)
      if (ref && ref.current) {
        console.log(normalizedDelta)
        ref.current.style.filter = `blur(${normalizedDelta * 0.12}rem)`
      }
    }
  }, [scrollSpeed])

  useEffect(() => {
    let lastPos: number | null
    let newPos: number | null
    let timer: any
    let delta: number = 0
    const delayToClear: number = 200

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
      timer = setTimeout(clear, delayToClear)
      return Math.abs(delta)
    }

    const handleScroll = () => {
      setScrollSpeed(getScrollSpeed())
    }

    window.addEventListener('scroll', throttle(50, handleScroll))

    return () => {
      window.removeEventListener('scroll', throttle(50, handleScroll))
    }
  }, [show])

  return (
    <Transition show={show}>
      <div className={'page-home'} ref={ref}>
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
            investissent l’espace public, en proposant une déambulation visuelle
            l’instant d’une nuit.
          </p>
        </div>

        <div className="page-home__container-2">
          <p className="page-home__container-2__title">COMMENT PARTICIPER ?</p>
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
      </div>
    </Transition>
  )
}

export default Home
