import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore, MapStore } from '../../store'
import './unlocked/installation-unlocked.scss'
import { observer } from 'mobx-react-lite'
import InstallationUnlockedTransition from './unlocked/Transition'
import InstallationLockedTransition from './locked/Transition'

type Props = pageProps & { show: boolean }

const Installation: FunctionComponent<Props> = ({ show, match, history }) => {
  const [installationIdentifier, setInstallationIdentifier] = useState()

  const {
    isInstallationUnlocked,
    getInstallationBySlug,
    setCurrentInstallationId,
  } = InstallationStore
  const { selectedInstallation } = MapStore

  useEffect(() => {
    if (match) {
      setInstallationIdentifier(
        selectedInstallation._id
          ? selectedInstallation._id
          : match.params.installationSlug
      )

      // TODO : required ?
      setCurrentInstallationId(
        selectedInstallation._id
          ? selectedInstallation._id
          : getInstallationBySlug(match.params.installationSlug)._id
      )

      InstallationStore.setUnlockedInstallationFromLocalStorage()
    }
  }, [match])

  return (
    <>
      {isInstallationUnlocked(installationIdentifier) ? (
        <InstallationUnlockedTransition
          show={show}
          match={match}
          history={history}
        />
      ) : (
        <InstallationLockedTransition
          show={show}
          match={match}
          history={history}
        />
      )}
    </>
  )
}

export default observer(Installation)
