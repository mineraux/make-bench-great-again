/* tslint:disable:jsx-no-lambda */

import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import config from '../../config/config'
import Countdown from '../../components/Countdown/Countdown'
import Modal from '../../components/Modal/Modal'

type Props = pageProps

const Components: FunctionComponent<Props> = ({ show }) => {
  return (
    <Transition show={show}>
      <div className={'page-components'}>
        <p>Page : Components</p>

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

        {/*** COUNTDOWN ***/}

        <Countdown />

        <hr />

        {/*** MODAL ***/}
        <div className="modal-container">
          <Modal
            modalTitle="Votre parcours commence !"
            textContent="Nous vous proposons de vous diriger vers l'installation la plus proche
            pour réaliser la performance et débloquer le contenu associé."
          />
        </div>
        <hr />
      </div>
    </Transition>
  )
}

export default Components
