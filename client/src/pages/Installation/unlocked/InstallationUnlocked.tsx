import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { pageProps } from '../../types'
import { InstallationStore, MapStore } from '../../../store'
import { ApiInstallation } from '../../../@types'
import './installation-unlocked.scss'
import ScrollMagicController from './ScrollMagicController'
import Button, {
  themes as buttonThemes,
} from '../../../components/Button/Button'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'
import SpriteAnimation from '../../../components/SpriteAnimation/SpriteAnimation'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import TwitterGallery from '../../../components/TwitterGallery/TwitterGallery'
import TutoTwitter from '../../../components/TutoTwitter/TutoTwitter'
import config from '../../../config/config'
import { TweenMax, Power2 } from 'gsap'
import AudioPlayer, {
  audios as AudioPlayerAudios,
} from '../../../components/AudioPlayer/AudioPlayer'
import { useWindowSize } from '../../../utils/hooks'
import { getHeaderHeight } from '../../../utils'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const ref = useRef<HTMLDivElement>(null)
  const initialWindowHeight = useRef(window.innerHeight)
  const [installation, setInstallation] = useState<ApiInstallation | null>(null)

  const { installationList, fetchInstallationList } = InstallationStore

  const {
    scrollProgressFirstPart,
    scrollProgressFirstPartTestimonyPlayer,
    setScrollProgressFirstPartTestimonyPlayer,
    isFirstPartPlayerPlaying,
    setIsFirstPartPlayerPlaying,
  } = ScrollMagicStore

  // mount / unmount
  useEffect(() => {
    window.scrollTo(0, 0)

    const getInstallationInformation = async () => {
      await InstallationStore.fetchSingleInstallation(
        {
          name: true,
          lockedName: true,
          caption: true,
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
          // ScrollMagicController.initController()
        })
    }

    if (match && installationList.length === 0) {
      fetchInstallationList({
        name: true,
        description: true,
        lockedDescription: true,
      })
    }

    if (match && !installation) {
      getInstallationInformation()
    }

    const onTouchStart = (e: any) => {
      const isString = (value: any) => {
        return typeof value === 'string' || value instanceof String
      }

      // TODO: don't work on IOS
      const isTouchOnPlayer = e.path.find((el: HTMLElement) => {
        return (
          isString(el.className) &&
          el.className.includes(
            'page-installation__wrapper__part--first-part__testimony__player'
          )
        )
      })

      if (!isTouchOnPlayer) {
        setIsFirstPartPlayerPlaying(false)
      }
    }

    if (ref.current) {
      ref.current.addEventListener('touchstart', onTouchStart)
    }

    return () => {
      ScrollMagicController.destroyScrollMagicScenes()
      if (ref.current) {
        ref.current.removeEventListener('touchstart', onTouchStart)
      }
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    if (installation) {
      ScrollMagicController.initController(installation)
    }
  }, [installation])

  const getTwitterUrl = (): string => {
    const tweet = `À l'occasion de la Nuit Blanche, grace à l'Envers du décors, j'ai essayé de m'installer sur des dispositifs anti-SDF...`
    const uri = `https://twitter.com/intent/tweet?text=${tweet}`
    return encodeURI(uri)
  }

  const redirectOnTwitterShare = () => {
    history.push('/')
  }

  const handleOnTogglePlayPlayer = (isPlay: boolean) => {
    setIsFirstPartPlayerPlaying(isPlay)
  }

  const handleSpriteAnimationInstance = () => {
    TweenMax.to(
      '.page-installation__wrapper__part--first-part__presentation__installation-sketch',
      1.5,
      {
        opacity: 1,
        ease: Power2.easeInOut,
      }
    )
  }

  const onClickTutoBtn = () => {
    TweenMax.set('.tuto-twitter', { className: '-=hidden' })
  }

  return (
    <div
      className="page-installation"
      ref={ref}
      style={{
        height: initialWindowHeight.current - getHeaderHeight(),
      }}
    >
      <div className="page-installation__wrapper">
        <div
          className="page-installation__wrapper__part--first-part"
          style={{
            height: initialWindowHeight.current - getHeaderHeight(),
          }}
        >
          <div className="page-installation__wrapper__part--first-part__presentation">
            <p className="page-installation__wrapper__part--first-part__presentation__title title1">
              {installation && installation.name}
            </p>
            <p className="page-installation__wrapper__part--first-part__presentation__title title2">
              {installation && installation.lockedName}
            </p>
            {installation && installation.slug && (
              <SpriteAnimation
                className={
                  'page-installation__wrapper__part--first-part__presentation__installation-sketch'
                }
                progression={scrollProgressFirstPart}
                animationID={installation.slug}
                onInstance={handleSpriteAnimationInstance}
              />
            )}

            <div className="page-installation__wrapper__part--first-part__presentation__description">
              <p
                className={
                  'page-installation__wrapper__part--first-part__presentation__description__text'
                }
              >
                {installation && installation.description}
              </p>
              <p
                className={
                  'page-installation__wrapper__part--first-part__presentation__description__caption'
                }
              >
                {' '}
                {installation && installation.caption}
              </p>
            </div>

            <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__mask" />
              <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container">
                <p className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content">
                  {installation && installation.lockedDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="page-installation__wrapper__part--first-part__testimony hidden">
            <p className="page-installation__wrapper__part--first-part__testimony__title">
              Témoignage
            </p>

            <div
              className={
                'page-installation__wrapper__part--first-part__testimony__talkers'
              }
            >
              {installation &&
                installation.testimony &&
                installation.testimony.talkers.map(talker => (
                  <div
                    className={`page-installation__wrapper__part--first-part__testimony__talkers__talker talker-${
                      talker.id
                    }`}
                    key={talker.id}
                  >
                    <p
                      className={
                        'page-installation__wrapper__part--first-part__testimony__talkers__talker__name'
                      }
                    >
                      {talker.name}
                    </p>
                    <p
                      className={
                        'page-installation__wrapper__part--first-part__testimony__talkers__talker__details'
                      }
                    >
                      {talker.details}
                    </p>
                  </div>
                ))}
            </div>

            {installation && installation.testimony && (
              <AudioPlayer
                className={
                  'page-installation__wrapper__part--first-part__testimony__player'
                }
                audio={installation.testimony.fileUrl}
                play={isFirstPartPlayerPlaying}
                onTogglePlay={handleOnTogglePlayPlayer}
                onProgress={setScrollProgressFirstPartTestimonyPlayer}
                progress={scrollProgressFirstPartTestimonyPlayer}
              />
            )}

            <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__mask" />
              <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container">
                <p className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container__text-content">
                  {installation &&
                    installation.testimony!.textContent.map((text, index) => (
                      <span
                        className={`page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container__text-content__text talker-${
                          text.talkerID
                        }`}
                        key={`${text.talkerID}-${index}`}
                      >
                        {text.text}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="page-installation__wrapper__part--second-part">
          <div className="page-installation__wrapper__part--second-part__challenge">
            {installation && (
              <div className="page-installation__wrapper__part--second-part__challenge__wrapper-title">
                <div className="page-installation__wrapper__part--second-part__challenge__wrapper-title__radial-circle" />
                <p
                  className="page-installation__wrapper__part--second-part__challenge__wrapper-title__title"
                  dangerouslySetInnerHTML={{
                    __html: `${installation.challengeText}`,
                  }}
                />
              </div>
            )}
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
              onClick={onClickTutoBtn}
              icon={true}
            />
            <p className="page-installation__wrapper__part--second-part__challenge__help">
              Plus nous serons nombreux, plus nous aurons de chances d'être
              entendus
            </p>
          </div>
          {installation && (
            <TutoTwitter
              className={'hidden'}
              hashtags={installation.hashTags}
            />
          )}
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
          {installation && installation.hashTags && (
            <TwitterGallery
              totalNumber={8}
              hashtags={installation.hashTags}
              isFake={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default observer(Installation)
