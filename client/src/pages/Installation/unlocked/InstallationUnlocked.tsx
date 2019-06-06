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
import { animationId } from '../../../components/SpriteAnimation/animations'
import TwitterGallery from '../../../components/TwitterGallery/TwitterGallery'
import TutoTwitter from '../../../components/TutoTwitter/TutoTwitter'
import config from '../../../config/config'
import { TweenMax, Power2 } from 'gsap'
import AudioPlayer, {
  audios as AudioPlayerAudios,
} from '../../../components/AudioPlayer/AudioPlayer'
import { useWindowSize, getHeaderHeight } from '../../../utils/hooks'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ match, history }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })
  const { installationList, fetchInstallationList } = InstallationStore

  const {
    scrollProgressFirstPart,
    scrollProgressFirstPartTestimonyPlayer,
    setScrollProgressFirstPartTestimonyPlayer,
    isFirstPartPlayerPlaying,
    setIsFirstPartPlayerPlaying,
  } = ScrollMagicStore
  const { setIsMapButtonVisible } = NavigationStore

  const windowHeight = useWindowSize().height

  // mount / unmount
  useEffect(() => {
    window.scrollTo(0, 0)

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

    const onTouchStart = (e: any) => {
      const isString = (value: any) => {
        return typeof value === 'string' || value instanceof String
      }

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
    <div className="page-installation" ref={ref}>
      <div className="page-installation__wrapper">
        <div className="page-installation__wrapper__part--first-part">
          <div className="page-installation__wrapper__part--first-part__presentation">
            <p className="page-installation__wrapper__part--first-part__presentation__title title1">
              {installation.name}
            </p>
            <p className="page-installation__wrapper__part--first-part__presentation__title title2">
              {'Autre titre'}
            </p>
            <SpriteAnimation
              className={
                'page-installation__wrapper__part--first-part__presentation__installation-sketch'
              }
              progression={scrollProgressFirstPart}
              animationID={animationId.bancMetro}
              onInstance={handleSpriteAnimationInstance}
            />

            <div className="page-installation__wrapper__part--first-part__presentation__description">
              <p
                className={
                  'page-installation__wrapper__part--first-part__presentation__description__text'
                }
              >
                Conçue comme une véritable ode à la nature, sa structure en
                courbes rappelle la forme délicate et organique des feuillages,
                ramenant une touche printanière dans la ville.
              </p>
              <p
                className={
                  'page-installation__wrapper__part--first-part__presentation__description__caption'
                }
              >
                Exedros, Fonte, résine de couleur “vert papier russe” H. : 150
                L. : 70cm, 2016
              </p>
            </div>

            <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__mask" />
              <div className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container">
                <p className="page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content">
                  {installation.lockedDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="page-installation__wrapper__part--first-part__testimony hidden">
            <p className="page-installation__wrapper__part--first-part__testimony__title">
              Témoignage
            </p>
            <AudioPlayer
              className={
                'page-installation__wrapper__part--first-part__testimony__player'
              }
              audio={AudioPlayerAudios.Audio1}
              play={isFirstPartPlayerPlaying}
              onTogglePlay={handleOnTogglePlayPlayer}
              onProgress={setScrollProgressFirstPartTestimonyPlayer}
              progress={scrollProgressFirstPartTestimonyPlayer}
            />
            <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper">
              <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__mask" />
              <div className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container">
                <p className="page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container__text-content">
                  Avant je pouvais venir dormir ici mais depuis qu'ils ont mis
                  en place ces accoudoirs, je suis obliger de dormir sur le
                  trottoir. On était au calme ici, bla bla bla Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Incidunt tenetur
                  quas itaque quisquam ipsum ipsa id minus laborum animi iusto
                  tempore, harum sit iste. Quod suscipit esse adipisci dicta
                  omnis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="page-installation__wrapper__part--second-part"
          style={{ height: windowHeight - getHeaderHeight() }}
        >
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
              onClick={onClickTutoBtn}
              icon={true}
            />
            <p className="page-installation__wrapper__part--second-part__challenge__help">
              Plus nous serons nombreux, plus nous aurons de chances d'être
              entendus
            </p>
          </div>
          <TutoTwitter className={'hidden'} hashtags={installation.hashTags} />
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
