import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  SyntheticEvent,
} from 'react'
import Classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { ReactComponent as PlayIcon } from './play.svg'
import { ReactComponent as PauseIcon } from './pause.svg'
import './audio-player.scss'
import { TweenMax } from 'gsap'

export enum audios {
  Audio1 = 'audio1',
  Temoignage1 = 'temoignage_01',
  Temoignage2 = 'temoignage_02',
  Temoignage3 = 'temoignage_03',
}

const audioPath: { [k: string]: string } = {
  [audios.Audio1]: `${process.env.PUBLIC_URL}/assets/audio/sample1.mp3`,
  [audios.Temoignage1]: `${
    process.env.PUBLIC_URL
  }/assets/audio/temoignage_01.mp3`,
  [audios.Temoignage2]: `${
    process.env.PUBLIC_URL
  }/assets/audio/temoignage_02.mp3`,
  [audios.Temoignage3]: `${
    process.env.PUBLIC_URL
  }/assets/audio/temoignage_03.mp3`,
}

type Props = {
  className?: string
  audio: audios | string
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
  const [progressState, setProgressState] = useState(progress)

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
    console.log('play', play)
    if (refAudio.current) {
      play ? refAudio.current.play() : refAudio.current.pause()
    }
  }, [play])

  // set currentTime if progress is different from progressState
  useEffect(() => {
    if (refAudio.current && isMetadaLoaded && progress !== progressState) {
      refAudio.current.currentTime = refAudio.current.duration * progress
      setProgressState(progress)
    }
  }, [progress, progressState, isMetadaLoaded])

  // set currentTime when metadata is loaded
  useEffect(() => {
    if (refAudio.current && isMetadaLoaded) {
      refAudio.current.currentTime = refAudio.current.duration * progress
    }
  }, [isMetadaLoaded])

  // animate svg on progress
  useEffect(() => {
    if (refRounProgressValue.current) {
      TweenMax.to(refRounProgressValue.current, 0.5, {
        strokeDashoffset: `${circumference * (1 - progressState)}`,
      })
    }
  }, [progressState])

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
    setProgressState(audioProgress)
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
