/* tslint:disable:jsx-no-lambda */

import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import config from '../../config/config'
import Countdown from '../../components/Countdown/Countdown'
import Modal from '../../components/Modal/Modal'
import BurgerButton, {
  themes as BurgerButtonThemes,
} from '../../components/BurgerButton/BurgerButton'
import Header, { themes as HeaderThemes } from '../../components/Header/Header'
import './components.scss'

type Props = pageProps

const Components: FunctionComponent<Props> = ({ show }) => {
  return (
    <Transition show={show}>
      <div className={'page-components'}>
        <p>Page : Components</p>

        <hr />

        {/*** BurgerButton ***/}

        <BurgerButton theme={BurgerButtonThemes.Blue} />

        <hr />

        {/*** BUTTON ***/}

        {/* Simple button */}
        <Button
          onClick={() => {
            console.log('click on button')
          }}
          label={'Un boutton simple'}
          theme={ButtonThemes.Blue}
        />

        {/* Internal Link button */}
        <Button
          onClick={() => {
            console.log('click on internal link')
          }}
          label={'Un boutton lien ver Home'}
          link={config.routes.Home.path}
          theme={ButtonThemes.Pink}
        />

        <hr />

        {/*** HEADER ***/}

        <Header title={'Un titre'} theme={HeaderThemes.Blue} />
        <Header title={'Un deuxième titre'} theme={HeaderThemes.Green} />

        <hr />

        {/*** MODAL ***/}

        <div className="modal-container">
          <Modal
            modalTitle="Votre parcours commence !"
            textContent="
          Nous vous proposons de vous diriger vers l’installation la plus proche pour réaliser la performance et débloquer le contenu associé.
          Pour cela nous aurons besoin de votre localisation. 
          "
            buttonLabel="Démarrer"
          />
        </div>
        <hr />
      </div>
    </Transition>
  )
}

export default Components
