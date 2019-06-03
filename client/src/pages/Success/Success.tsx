import React, { FunctionComponent, useEffect } from 'react'
import { pageProps } from '../types'
import './success.scss'
import { observer } from 'mobx-react-lite'
import { MapStore } from '../../store'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import { ReactComponent as Background } from './background.svg'

type Props = pageProps & {}

const Success: FunctionComponent<Props> = ({ match, history }) => {
  return (
    <div className="page-success">
      <Background className={'page-success__svg'} />
      <div className="page-success__presentation">
        <div className="page-success__presentation__radial-circle" />
        <p className="page-success__presentation__title">
          {MapStore.targetInstallation.name}
        </p>
        <p className="page-success__presentation__text-content">
          Vous êtes arrivé devant {MapStore.targetInstallation.name}. Son
          contenu est maintenant débloqué.
        </p>
        <Button
          link={`/installation/${MapStore.targetInstallation.slug}`}
          label={'Découvrir'}
          theme={ButtonThemes.Blue}
          className={'page-success__presentation__discover-button'}
        />
      </div>
    </div>
  )
}

export default observer(Success)
