/* tslint:disable:jsx-no-lambda */

import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import { pageProps } from '../types'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import config from '../../config/config'
import Modal from '../../components/Modal/Modal'
import BurgerButton, {
  themes as BurgerButtonThemes,
} from '../../components/BurgerButton/BurgerButton'
import Header, { themes as HeaderThemes } from '../../components/Header/Header'
import './components.scss'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import ScrollIndication, {
  themes as scrollIndicationThemes,
} from '../../components/ScrollIndication/ScrollIndication'
import SpriteAnimation from '../../components/SpriteAnimation/SpriteAnimation'
import { animationId } from '../../components/SpriteAnimation/animations'
import SplashscreenAnimation from '../../components/SplashscreenAnimation/SplashscreenAnimation'
import AudioPlayer, {
  audios as AudioPlayerAudios,
} from '../../components/AudioPlayer/AudioPlayer'

type Props = pageProps

const Components: FunctionComponent<Props> = () => {
  const {
    scrollProgression,
    setScrollProgression,
    setIsMapButtonVisible,
  } = NavigationStore

  // Audio player

  const [audioPlayerIsPlay, setAudioPlayerIsPlay] = useState(false)
  const [audioPlayerProgress, setAudioPlayerProgress] = useState(0.5)

  // ProgressBar

  const handleOnChangeProgression = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScrollProgression(Number(e.target.value))
  }

  // SpriteAnimation

  const [spriteAnimationProgression, setSpriteAnimationProgression] = useState()
  const handleSpriteAnimationInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpriteAnimationProgression(Number(e.target.value))
  }

  useEffect(() => {
    setIsMapButtonVisible(true)
  })

  return (
    <div className={'page-components'}>
      <p>Page : Components</p>

      <hr />

      {/*** BurgerButton ***/}

      <BurgerButton theme={BurgerButtonThemes.Green} />

      <hr />

      <AudioPlayer
        audio={AudioPlayerAudios.Audio1}
        onProgress={progress => {
          console.log('AudioPlayer progression', progress)
          setAudioPlayerProgress(progress)
        }}
        onTogglePlay={isPlaying => {
          console.log('AudioPlayer isPlaying', isPlaying)
          setAudioPlayerIsPlay(isPlaying)
        }}
        play={audioPlayerIsPlay}
        progress={audioPlayerProgress}
      />

      <button
        onClick={() => {
          setAudioPlayerIsPlay(true)
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          setAudioPlayerIsPlay(false)
        }}
      >
        Pause
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={audioPlayerProgress}
        onChange={e => {
          setAudioPlayerProgress(Number(e.target.value))
        }}
      />

      <hr />

      {/*** BUTTON ***/}

      {/* Simple button */}
      <Button
        onClick={() => {
          console.log('click on button')
        }}
        label={'Un boutton simple'}
        theme={ButtonThemes.Blue}
      />

      {/* Internal Link button */}
      <Button
        onClick={() => {
          console.log('click on internal link')
        }}
        label={'Un boutton lien ver Home'}
        link={config.routes.Home.path}
        theme={ButtonThemes.Pink}
      />

      <hr />

      {/*** HEADER ***/}

      <Header title={'Un titre'} theme={HeaderThemes.Blue} />
      <Header title={'Un deuxième titre'} theme={HeaderThemes.Green} />

      <p>Set scroll progression</p>

      <input
        type="range"
        min={0}
        step={0.01}
        max={1}
        value={scrollProgression}
        onChange={handleOnChangeProgression}
      />

      <hr />

      {/*** MODAL ***/}

      <div className="modal-container">
        <Modal
          modalTitle="Votre parcours commence !"
          textContent="
          Nous vous proposons de vous diriger vers l’installation la plus proche pour réaliser la performance et débloquer le contenu associé.
          Pour cela nous aurons besoin de votre localisation. 
          "
          buttonLabel="Démarrer"
        />
      </div>
      <hr />

      <ProgressBar progression={0.2} />
      <hr />
      <ProgressBar progression={0.8} />

      <hr />

      {/***  SCROLL INDICATION ***/}

      <ScrollIndication theme={scrollIndicationThemes.Blue} />

      <hr />

      <SpriteAnimation
        progression={spriteAnimationProgression}
        animationID={animationId.bancMetro}
      />

      <input
        className={'sprite-animation__input'}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={spriteAnimationProgression}
        onChange={handleSpriteAnimationInputChange}
      />

      <hr />
    </div>
  )
}

export default observer(Components)
