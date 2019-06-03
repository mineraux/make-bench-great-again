import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../../types'
import { InstallationStore } from '../../../store'
import { ApiInstallation } from '../../../@types'
import './installation-locked.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'
import ScrollMagicController from './ScrollMagicController'
import SpriteAnimation from '../../../components/SpriteAnimation/SpriteAnimation'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { animationId } from '../../../components/SpriteAnimation/animations'
import Bench from '../../../assets/images/banc_metro_01.png'
import { useWindowSize } from '../../../utils/hooks'

type Props = pageProps & {}

const InstallationLocked: FunctionComponent<Props> = ({ match, history }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore
  const { setIsMapButtonVisible } = NavigationStore
  const { scrollProgressFirstPart } = ScrollMagicStore

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
      {
        name: true,
        description: true,
        lockedDescription: true,
      },
      undefined,
      match.params.installationSlug
    )
      .then(res => {
        setInstallation(res)
      })
      .then(() => {
        ScrollMagicController.initController()
      })
  }

  const windowHeight = useWindowSize().height - 42.5
  const yolo = windowHeight - 46
  return (
    <div className="page-installation--locked">
      <div className="page-installation--locked__presentation">
        <p className="page-installation--locked__presentation__title">
          {installation.name}
        </p>
        <div
          className="page-installation--locked__presentation__content-wrapper"
          style={{
            height: yolo,
          }}
        >
          <div className="page-installation--locked__presentation__content-wrapper__mask" />
          <div className="test">
            <img
              src={Bench}
              alt=""
              className="page-installation--locked__presentation__content-wrapper__installation-sketch"
            />
            <p className="page-installation--locked__presentation__content-wrapper__text-content">
              {installation.description}
            </p>
          </div>
        </div>
      </div>
      <div
        className="page-installation--locked__go-to-installation"
        style={{
          height: windowHeight,
        }}
      >
        <p>Rendez vous devant l'oeuvre pour débloquer le contenu</p>
      </div>
    </div>
  )
}

export default observer(InstallationLocked)
