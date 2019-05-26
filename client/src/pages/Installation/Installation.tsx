import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'
import './installation.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import config from '../../config/config'
import InstallationUnlocked from './InstallationUnlocked'
import InstallationLocked from './InstallationLocked'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const [installationSlug, setInstallationSlug] = useState()

  useEffect(() => {
    setInstallationSlug(match.params.installationSlug)
  }, [])

  return (
    <>
      match &&{' '}
      {InstallationStore.isInstallationUnlocked(installationSlug) ? (
        <InstallationUnlocked match={match} history={history} />
      ) : (
        <InstallationLocked match={match} history={history} />
      )}
    </>
  )
}

export default observer(Installation)
