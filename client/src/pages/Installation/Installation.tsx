import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore, MapStore } from '../../store'
import './unlocked/installation-unlocked.scss'
import { observer } from 'mobx-react-lite'
import InstallationUnlocked from './unlocked/InstallationUnlocked'
import InstallationLocked from './locked/InstallationLocked'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const [installationIdentifier, setInstallationIdentifier] = useState()

  const { isInstallationUnlocked } = InstallationStore
  const { selectedInstallation } = MapStore

  useEffect(() => {
    setInstallationIdentifier(
      selectedInstallation._id
        ? selectedInstallation._id
        : match.params.installationSlug
    )
  }, [])

  return (
    <>
      {isInstallationUnlocked(installationIdentifier) ? (
        <InstallationUnlocked match={match} history={history} />
      ) : (
        <InstallationLocked match={match} history={history} />
      )}
    </>
  )
}

export default observer(Installation)
