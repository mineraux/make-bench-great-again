import React, { FunctionComponent, useState, useEffect, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { useWindowSize } from '../../utils/hooks'
import { ReactComponent as GobelinsLogo } from './gobelins-logo.svg'
import { ReactComponent as ParisLogo } from './paris-logo.svg'
import './about.scss'

type Props = pageProps

const About: FunctionComponent<Props> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    // setIsMapButtonVisible(true)
  }, [])

  return (
    <div className={'page-about'} style={{ height: windowSize.height }}>
      <div className="page-about__top">
        <div className="page-about__top__round" />
        <div className="page-about__top__texts">
          <p className="page-about__top__texts__text-1">
            L’Envers du décor vous propose un parcours conçu sous forme de
            séries de performances.
          </p>
          <p className="page-about__top__texts__text-2">
            Il s’agit de donner une place nouvelle aux talents émergents qui
            investissent l’espace public, en proposant une déambulation visuelle
            l’instant d’une nuit.
          </p>
        </div>
      </div>
      <div className="page-about__bottom">
        <div className="page-about__bottom__texts">
          <p className="page-about__bottom__texts__text-1">
            Ce festival a vu le jour dans le cadre d’un projet pédagogique au
            sein de Gobelins, l’École de l’image.
          </p>
          <p className="page-about__bottom__texts__text-2">
            Projet conçu et réalisé par <br />
            Manon Carrour, Alexandre Massé, Robin Minervini et Clara Vigourous.
          </p>
        </div>
        <div className="page-about__bottom__logos">
          <GobelinsLogo className="page-about__bottom__logos__gobelins" />
          <ParisLogo className="page-about__bottom__logos__paris" />
        </div>
      </div>
    </div>
  )
}

export default observer(About)
