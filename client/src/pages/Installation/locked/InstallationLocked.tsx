import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { pageProps } from '../../types'
import { InstallationStore, MapStore } from '../../../store'
import { ApiInstallation } from '../../../@types'
import './installation-locked.scss'
import ScrollMagicController from './ScrollMagicController'
import Button, {
  themes as buttonThemes,
} from '../../../components/Button/Button'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'
import SpriteAnimation from '../../../components/SpriteAnimation/SpriteAnimation'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { animationId } from '../../../components/SpriteAnimation/animations'
import config from '../../../config/config'
import { TweenMax, Power2 } from 'gsap'
import { useWindowSize } from '../../../utils/hooks'
import { getHeaderHeight } from '../../../utils'
import { themes as scrollIndicationThemes } from '../../../components/ScrollIndication/ScrollIndication'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore

  const { scrollProgressFirstPart } = ScrollMagicStore

  const {
    setIsMapButtonVisible,
    setScrollIndicationTheme,
    setIsScrollIndicationVisible,
    setIsScrollIndicationTextVisible,
  } = NavigationStore

  // mount / unmount
  useEffect(() => {
    window.scrollTo(0, 0)

    setScrollIndicationTheme(scrollIndicationThemes.Green)
    setIsScrollIndicationVisible(false)
    setIsScrollIndicationTextVisible(true)

    if (match && installationList.length === 0) {
      fetchInstallationList({
        name: true,
        description: true,
      })
    }

    if (match && installation._id.length === 0) {
      getInstallationInformation()
    }

    return () => {
      ScrollMagicController.destroyScrollMagicScenes()
      window.scrollTo(0, 0)
      setIsScrollIndicationVisible(false)
    }
  }, [])

  const getInstallationInformation = async () => {
    await InstallationStore.fetchSingleInstallation(
      {
        name: true,
        description: true,
      },
      InstallationStore.getInstallationBySlug(match.params.installationSlug)._id
    ).then(res => {
      setInstallation(res)
    })
  }

  useEffect(() => {
    if (installation) {
      ScrollMagicController.initController()
      handleSpriteAnimationInstance()
    }
  }, [installation])

  const handleSpriteAnimationInstance = () => {
    TweenMax.to(
      '.page-installation--locked__wrapper__part--first-part__presentation__installation-sketch',
      1.5,
      {
        opacity: 1,
        ease: Power2.easeInOut,
      }
    )
  }

  const onButtonClick = () => {
    const target = InstallationStore.getInstallationBySlug(
      match.params.installationSlug
    )
    MapStore.setTargetInstallation(target)
    MapStore.setCalculatePathFromAnotherPage(true)
  }

  const windowHeight = useWindowSize().height
  return (
    <div className="page-installation--locked" ref={ref}>
      <div className="page-installation--locked__wrapper">
        <div className="page-installation--locked__wrapper__part--first-part">
          <div className="page-installation--locked__wrapper__part--first-part__presentation">
            <p className="page-installation--locked__wrapper__part--first-part__presentation__title">
              {installation.name}
            </p>

            <img
              src={`${process.env.PUBLIC_URL}/assets/images/installations/${
                installation.slug
              }_locked.png`}
              alt=""
              className={
                'page-installation--locked__wrapper__part--first-part__presentation__installation-sketch'
              }
            />

            <div className="page-installation--locked__wrapper__part--first-part__presentation__description">
              <p
                className={
                  'page-installation--locked__wrapper__part--first-part__presentation__description__text'
                }
              >
                {installation.description}
              </p>
              <p
                className={
                  'page-installation--locked__wrapper__part--first-part__presentation__description__caption'
                }
              >
                {installation.caption}
              </p>
            </div>
          </div>
          <div
            className="page-installation--locked__wrapper__part--first-part__go-to-installation"
            style={{
              height: windowHeight - getHeaderHeight(),
            }}
          >
            <p>Rendez vous devant l'oeuvre pour débloquer le contenu</p>

            <Button
              onClick={onButtonClick}
              label={'Calculer mon itinéraire'}
              theme={buttonThemes.Green}
              link={'/map'}
              className={'informations-panel__set-direction-button'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Installation)
