import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'
import './installation.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import SpriteAnimation from '../../components/SpriteAnimation/SpriteAnimation'
import { animationId } from '../../components/SpriteAnimation/animations'

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
    <div className="page-installation">
      {/* <div className="page-installation__wrapper">
        <div className="page-installation__part1">
          <div className="page-installation__presentation">
            <p className="page-installation__presentation__title">
              {installation.name}
            </p>
            <SpriteAnimation
              className={'page-installation__presentation__installation-sketch'}
              progression={0}
              animationID={animationId.bancMetro}
            />
            <div className="page-installation__presentation__text-content-wrapper">
              <div className="page-installation__presentation__text-content-wrapper__mask" />
              <p className="page-installation__presentation__text-content">
                {installation.description}
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <p>Content locked</p>
    </div>
  )
}

export default observer(InstallationLocked)
