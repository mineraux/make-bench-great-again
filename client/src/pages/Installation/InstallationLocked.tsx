import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'
import './installation.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'

type Props = pageProps & {}

const InstallationLocked: FunctionComponent<Props> = ({ match, history }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore
  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    if (match && installationList.length === 0) {
      fetchInstallationList({
        name: true,
        description: true,
      })
    }
    if (match && installation._id.length === 0) {
      getInstallationInformation()
    }
    setIsMapButtonVisible(true)
  }, [])

  const getInstallationInformation = async () => {
    'match.params.installationId'
    await InstallationStore.fetchSingleInstallation('1', {
      name: true,
      description: true,
      lockedDescription: true,
    }).then(res => {
      setInstallation(res)
    })
  }

  return (
    <div className="page-installation--locked">
      <div className="page-installation--locked__presentation">
        <p className="page-installation--locked__presentation__title">
          {installation.name}
        </p>
        <p className="page-installation--locked__presentation__text-content">
          {installation.description}
        </p>
      </div>
    </div>
  )
}

export default observer(InstallationLocked)
