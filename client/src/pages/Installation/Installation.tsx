import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore, MapStore } from '../../store'
import './installation.scss'
import { observer } from 'mobx-react-lite'
import InstallationUnlocked from './InstallationUnlocked'
import InstallationLocked from './InstallationLocked'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const [installationIdentifier, setInstallationIdentifier] = useState()

  useEffect(() => {
    setInstallationIdentifier(
      MapStore.selectedInstallation._id
        ? MapStore.selectedInstallation._id
        : match.params.installationSlug
    )

    InstallationStore.setUnlockedInstallationFromLocalStorage()
  }, [])

  return (
    <>
      {InstallationStore.isInstallationUnlocked(installationIdentifier) ? (
        <InstallationUnlocked match={match} history={history} />
      ) : (
        <InstallationLocked match={match} history={history} />
      )}
    </>
  )
}

export default observer(Installation)
