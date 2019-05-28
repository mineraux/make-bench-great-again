import React, { FunctionComponent, useEffect } from 'react'
import { pageProps } from '../types'
import './alertContentUnlocked.scss'
import { observer } from 'mobx-react-lite'
import { MapStore } from '../../store'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'

type Props = pageProps & {}

const AlertContentUnlocked: FunctionComponent<Props> = ({ match, history }) => {
  useEffect(() => {
    console.log(MapStore.targetInstallation.name)
  }, [])

  return (
    <div className="alert-content-unlocked">
      <div className="alert-content-unlocked__presentation">
        <p className="alert-content-unlocked__presentation__title">
          {MapStore.targetInstallation.name}
        </p>
        <p className="alert-content-unlocked__presentation__text-content">
          Vous êtes arrivé devant {MapStore.targetInstallation.name}. Son
          contenu est maintenant débloqué.
        </p>
        <Button
          label={'Découvrir'}
          theme={ButtonThemes.Blue}
          className={'alert-content-unlocked__discover-button'}
        />
      </div>
    </div>
  )
}

export default observer(AlertContentUnlocked)
