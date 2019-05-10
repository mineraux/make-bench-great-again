import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'
import './installation.scss'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ show, match }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })

  useEffect(() => {
    if (match && installation._id.length === 0) {
      getInstallationInformation()
    }
  }, [])

  const getInstallationInformation = async () => {
    await InstallationStore.fetchSingleInstallation(
      match.params.installationId,
      {
        name: true,
        description: true,
        lockedDescription: true,
      }
    ).then(res => {
      setInstallation(res)
    })
  }

  return (
    <Transition show={show}>
      <div className="page-installation">
        <p className="page-installation__installation-name">
          {installation.name}
        </p>
        <p className="page-installation__installation-description">
          {installation.description}
        </p>
        <p className="page-installation__installation-locked-description">
          {installation.lockedDescription}
          {installation.lockedDescription}
        </p>
      </div>
    </Transition>
  )
}

export default Installation
