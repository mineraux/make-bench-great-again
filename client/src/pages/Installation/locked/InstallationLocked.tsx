import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../../types'
import { InstallationStore } from '../../../store'
import { ApiInstallation } from '../../../@types'
import './installation-locked.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'
import ScrollMagicController from './ScrollMagicController'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import Bench from '../../../assets/images/banc_metro_01.png'
import {
  useWindowSize,
  useClientRect,
  getHeaderHeight,
} from '../../../utils/hooks'
import { ReactComponent as Progress } from './progress.svg'
import Button, {
  themes as ButtonThemes,
} from '../../../components/Button/Button'

type Props = pageProps & {}

const InstallationLocked: FunctionComponent<Props> = ({ match, history }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore
  const { setIsMapButtonVisible } = NavigationStore
  const { scrollProgressFirstPart } = ScrollMagicStore
  const [rectTitle, refTitle] = useClientRect()

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

    return () => {
      ScrollMagicController.destroyScrollMagicScenes()
      window.scrollTo(0, 0)
    }
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

  const windowHeight = useWindowSize().height

  const onButtonClick = () => {
    console.log('test')
  }

  return (
    <div className="page-installation--locked">
      <div className="page-installation--locked__wrapper">
        <div className="page-installation--locked__presentation">
          <Progress
            className={'page-installation--locked__presentation__svg'}
          />
          <div
            ref={refTitle}
            className="page-installation--locked__presentation__title--wrapper"
          >
            <p className="page-installation--locked__presentation__title">
              {installation.name}
            </p>
          </div>

          {rectTitle !== null &&
            installation.name &&
            installation.name.length > 0 && (
              <div
                className="page-installation--locked__presentation__content-wrapper"
                style={{
                  height: windowHeight - getHeaderHeight() - rectTitle.height,
                }}
              >
                <div className="page-installation--locked__presentation__content-wrapper__mask" />
                <div className="page-installation--locked__presentation__content-wrapper__fake-scroll-wrapper">
                  <img
                    src={Bench}
                    alt=""
                    className="page-installation--locked__presentation__content-wrapper__installation-sketch"
                    style={{
                      height:
                        windowHeight - getHeaderHeight() - rectTitle.height,
                    }}
                  />
                  <p
                    className="page-installation--locked__presentation__content-wrapper__text-content"
                    style={{
                      height:
                        windowHeight - getHeaderHeight() - rectTitle.height,
                    }}
                  >
                    {installation.description}
                  </p>
                </div>
              </div>
            )}
        </div>
        <div
          className="page-installation--locked__go-to-installation"
          style={{
            height: windowHeight - getHeaderHeight(),
          }}
        >
          <p>Rendez vous devant l'oeuvre pour débloquer le contenu</p>

          <Button
            onClick={onButtonClick}
            label={'Calculer mon itinéraire'}
            theme={ButtonThemes.Green}
            link={'/map'}
            className={'informations-panel__set-direction-button'}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(InstallationLocked)
