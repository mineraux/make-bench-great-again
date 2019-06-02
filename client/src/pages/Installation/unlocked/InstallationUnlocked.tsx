import React, { FunctionComponent, useEffect, useState } from 'react'
import { pageProps } from '../../types'
import { InstallationStore, MapStore } from '../../../store'
import { ApiInstallation } from '../../../@types'
import './installation-unlocked.scss'
import ScrollMagicController from './ScrollMagicController'
import DummyPlayer from './../../../assets/images/dummy_player.png'
import Button, {
  themes as buttonThemes,
} from '../../../components/Button/Button'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'
import SpriteAnimation from '../../../components/SpriteAnimation/SpriteAnimation'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { animationId } from '../../../components/SpriteAnimation/animations'
import TwitterGallery from '../../../components/TwitterGallery/TwitterGallery'
import config from '../../../config/config'
import { TweenMax, Power2 } from 'gsap'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore

  const { scrollProgressFirstPart } = ScrollMagicStore
  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    if (match && installationList.length === 0) {
      fetchInstallationList({
        name: true,
        description: true,
        lockedDescription: true,
      })
    }
    if (match && installation._id.length === 0) {
      getInstallationInformation()
    }
    setIsMapButtonVisible(true)

    TweenMax.to(
      '.page-installation__wrapper__part--first-part__presentation__installation-sketch',
      2,
      {
        opacity: 1,
        delay: 1,
        ease: Power2.easeInOut,
      }
    )

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
      MapStore.selectedInstallation._id
        ? MapStore.selectedInstallation._id
        : undefined,
      !MapStore.selectedInstallation._id
        ? match.params.installationSlug
        : undefined
    )
      .then(res => {
        setInstallation(res)
      })
      .then(() => {
        ScrollMagicController.initController()
      })
  }

  const getTwitterUrl = (): string => {
    const tweet = `À l'occasion de la Nuit Blanche, grace à l'Envers du décors, j'ai essayé de m'installer sur des dispositifs anti-SDF...`
    const uri = `https://twitter.com/intent/tweet?text=${tweet}`
    return encodeURI(uri)
  }

  const redirectOnTwitterShare = () => {
    history.push('/')
  }

  return (
    <div className="page-installation">
      <div className="page-installation__wrapper">
        <div className="page-installation__wrapper__part--first-part">
          <div className="page-installation__wrapper__part--first-part__presentation">
            <p className="page-installation__wrapper__part--first-part__presentation__title">
              {installation.name}
            </p>
            <SpriteAnimation
              className={
                'page-installation__wrapper__part--first-part__presentation__installation-sketch'
              }
              progression={scrollProgressFirstPart}
              animationID={animationId.bancMetro}
            />
            <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__mask" />
              <p className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__text-content">
                {installation.lockedDescription}
              </p>
            </div>
          </div>

          <div className="page-installation__wrapper__part--first-part__testimony">
            <p className="page-installation__wrapper__part--first-part__testimony__title">
              Témoignage
            </p>
            <img
              className="page-installation__wrapper__part--first-part__testimony__player"
              src={DummyPlayer}
              alt=""
            />
            <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__mask" />
              <p className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__text-content">
                Avant je pouvais venir dormir ici mais depuis qu'ils ont mis en
                place ces accoudoirs, je suis obliger de dormir sur le trottoir.
                On était au calme ici, bla bla bla Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Incidunt tenetur quas itaque
                quisquam ipsum ipsa id minus laborum animi iusto tempore, harum
                sit iste. Quod suscipit esse adipisci dicta omnis.
              </p>
            </div>
          </div>
        </div>
        <div className="page-installation__wrapper__part--second-part">
          <div className="page-installation__wrapper__part--second-part__challenge">
            <p
              className="page-installation__wrapper__part--second-part__challenge__title"
              dangerouslySetInnerHTML={{
                __html:
                  "Es-tu assez souple pour réussir à t'allonger sur cette installation&nbsp;?",
              }}
            />
            <div className="page-installation__wrapper__part--second-part__challenge__text-content">
              <p>
                Pour témoigner de ton indignation et nous aider à retirer ce
                dispositifi anti-SDF. <br />
                <span className="page-installation__wrapper__part--second-part__challenge__text-content--bold">
                  Prends-toi en photo et poste ta performance sur Twitter, ta
                  photo servira de signature pour notre pétition
                </span>
              </p>
            </div>
            <Button
              className={
                'page-installation__wrapper__part--second-part__challenge__sign-petition-button'
              }
              label="Signer la pétition"
              theme={buttonThemes.Blue}
              url={getTwitterUrl()}
              icon={true}
            />
            <p className="page-installation__wrapper__part--second-part__challenge__help">
              Plus nous serons nombreux, plus nous aurons de chances d'être
              entendus
            </p>
          </div>
        </div>
        <div className="page-installation__wrapper__part--third-part">
          <p className="page-installation__wrapper__part--third-part__title">
            ILS SE SONT ENGAGÉS
          </p>

          <Button
            className={'page-installation__wrapper__part--third-part__button'}
            label={'Poursuivre le parcours'}
            theme={buttonThemes.Green}
            link={config.routes.Finish.path}
          />
          <TwitterGallery totalNumber={8} hashtags={['fake']} isFake={true} />
        </div>
      </div>
    </div>
  )
}

export default observer(Installation)