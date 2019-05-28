import React, { FunctionComponent, useEffect } from 'react'
import { pageProps } from '../types'
import './alertContentUnlocked.scss'
import { observer } from 'mobx-react-lite'
import { MapStore } from '../../store'

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
          test
        </p>
      </div>
    </div>
  )
}

export default observer(AlertContentUnlocked)
