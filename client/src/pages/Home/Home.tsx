import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import config from '../../config/config'
// styles
import './home.scss'
import Button, { themes as buttonThemes } from '../../components/Button/Button'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ show }) => {
  return (
    <Transition show={show}>
      <div className={'page-home'}>
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
