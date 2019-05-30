import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  ReactEventHandler,
  SyntheticEvent,
} from 'react'
import Classnames from 'classnames'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as PlayIcon } from './play.svg'
import { ReactComponent as PauseIcon } from './pause.svg'
import './audio-player.scss'
import { TweenMax, TimelineMax, Sine, Power2 } from 'gsap'

export enum audios {
  Audio1 = 'audio1',
  Audio2 = 'audio2',
}

const audioPath = {
  [audios.Audio1]: `${process.env.PUBLIC_URL}/assets/audio/sample1.mp3`,
  [audios.Audio2]: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3',
}

type Props = {
  className?: string
  audio: audios
  play: boolean
  progress: number
  onTogglePlay?: (isPlaying: boolean) => any
  onProgress?: (progress: number) => any
}

const AudioPlayer: FunctionComponent<Props> = ({
  className,
  audio,
  play,
  progress,
  onTogglePlay,
  onProgress,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const refAudio = useRef<HTMLAudioElement>(null)
  const refRounProgressValue = useRef<SVGCircleElement>(null)

  const [isMetadaLoaded, setIsMetadaLoaded] = useState(false)

  const radius = 54
  const circumference: number = 2 * Math.PI * radius

  useEffect(() => {
    if (refRounProgressValue.current) {
      refRounProgressValue.current.style.strokeDasharray = `${circumference}`
      // set progress to 0
      refRounProgressValue.current.style.strokeDashoffset = `${circumference}`
    }
  }, [])

  useEffect(() => {
    if (refAudio.current) {
      play ? refAudio.current.play() : refAudio.current.pause()
    }
  }, [play])

  useEffect(() => {
    if (refAudio.current && isMetadaLoaded) {
      refAudio.current.currentTime = refAudio.current.duration * progress
    }
  }, [progress, isMetadaLoaded])

  useEffect(() => {
    if (refRounProgressValue.current) {
      TweenMax.to(refRounProgressValue.current, 0.5, {
        strokeDashoffset: `${circumference * (1 - progress)}`,
      })
    }
  }, [progress])

  const handleOnClick = () => {
    if (refAudio.current) {
      play ? refAudio.current.pause() : refAudio.current.play()
    }
  }

  const handleOnPlayAudio = (e: SyntheticEvent<HTMLAudioElement>) => {
    if (onTogglePlay) {
      onTogglePlay(true)
    }
  }

  const handleOnTimeUpdateAudio = (e: SyntheticEvent<HTMLAudioElement>) => {
    const audioProgress =
      refAudio.current!.currentTime / refAudio.current!.duration
    if (onProgress) {
      onProgress(audioProgress)
    }
  }

  const handleOnPauseAudio = (e: SyntheticEvent<HTMLAudioElement>) => {
    if (onTogglePlay) {
      onTogglePlay(false)
    }
  }
  const handleLoadedMetadata = (e: SyntheticEvent<HTMLAudioElement>) => {
    setIsMetadaLoaded(true)
  }

  return (
    <div
      ref={ref}
      className={Classnames('audio-player', className)}
      onClick={handleOnClick}
    >
      <svg
        className="audio-player__round-progress"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <circle
          className="audio-player__round-progress__meter"
          cx="60"
          cy="60"
          r="54"
          strokeWidth="1"
        />
        <circle
          ref={refRounProgressValue}
          className="audio-player__round-progress__value"
          cx="60"
          cy="60"
          r="54"
          strokeWidth="4"
        />
      </svg>

      {play ? (
        <PauseIcon className={Classnames('audio-player__pause')} />
      ) : (
        <PlayIcon className={Classnames('audio-player__play')} />
      )}

      <audio
        ref={refAudio}
        src={audioPath[audio]}
        onPlay={handleOnPlayAudio}
        onPause={handleOnPauseAudio}
        onTimeUpdate={handleOnTimeUpdateAudio}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  )
}

export default observer(AudioPlayer)
